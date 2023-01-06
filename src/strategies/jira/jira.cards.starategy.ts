import { CardsStrategy } from '../abstractions/cards.strategy.interface';
import { EdgeDto } from '../../cards/dto/edge.dto';
import { CardDto } from '../../cards/dto/card.dto';
import { JiraApi } from '../../api/jira.api';
import { PrismaService } from '../../prisma/prisma.service';

export class JiraCardsStrategy implements CardsStrategy {
  constructor(
    private readonly jiraApi: JiraApi,
    private readonly prismaService: PrismaService,
  ) {}

  async getBoardCardEdges(userId: string, boardId: string): Promise<EdgeDto[]> {
    const jira = await this.jiraApi.createJira(userId);
    const value = await jira.board.getIssuesForBoard({
      boardId: boardId,
    });
    const issueIds = value['issues'].map((issue) => issue.id);
    const edges: EdgeDto[] = [];
    for (const id of issueIds) {
      const issue = await jira.issue.getIssue({
        issueId: id,
        fields: ['issuelinks'],
      });
      const links = await issue.fields.issuelinks;
      links.map((link) => {
        if (link.inwardIssue?.id) {
          edges.push({
            from: id,
            to: link.inwardIssue.id,
          });
        }
      });
    }
    return edges;
  }

  async getBoardCards(userId: string, boardId: string): Promise<CardDto[]> {
    const jira = await this.jiraApi.createJira(userId);
    const value = await jira.board.getIssuesForBoard({
      boardId: boardId,
    });
    const cards = await Promise.all(
      value['issues'].map(
        async (issue) =>
          await jira.issue.getIssue({
            issueId: issue.id,
          }),
      ),
    );
    const project = await this.prismaService.project.findFirst({
      where: {
        userId: userId,
        boardId: boardId,
      },
    });
    await this.syncCards(project, cards);
    const carolineCardsPositions = await this.prismaService.card.findMany({
      where: {
        projectId: project.id,
      },
    });

    return cards.map((issue) => ({
      id: issue.id,
      title: issue.fields?.summary,
      workers: [issue.fields.assignee?.accountId],
      tags: issue.fields.labels,
      position: {
        x: carolineCardsPositions.filter(
          (carolineCard) => carolineCard.cardId == issue.id,
        )[0].X,
        y: carolineCardsPositions.filter(
          (carolineCard) => carolineCard.cardId == issue.id,
        )[0].Y,
      },
      type: 'task',
      state: [issue.fields.status.id],
      description: issue.fields.description,
      url: '',
      shortLink: '',
      img: '',
    }));
  }

  private async syncCards(project: any, allCards: any) {
    const cards = await this.prismaService.card.findMany({
      where: {
        projectId: project.id,
      },
    });

    const deletedCards = cards.filter(
      (carolineCard) =>
        !allCards.map((apiCard) => apiCard.id).includes(carolineCard.cardId),
    );

    for (const card of deletedCards) {
      await this.prismaService.card.delete({
        where: {
          id: card.id,
        },
      });
    }

    const newCards = allCards
      .filter(
        (apiCard) =>
          !cards
            .map((carolineCard) => carolineCard.cardId)
            .includes(apiCard.id),
      )
      .map((card) => {
        return {
          cardId: card.id,
          X: 0,
          Y: 0,
        };
      });
    if (newCards.length !== 0) {
      await this.prismaService.project.update({
        where: {
          id: project.id,
        },
        data: {
          cards: {
            createMany: {
              data: newCards,
            },
          },
        },
      });
    }
  }
}
