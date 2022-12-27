import { AsanaApi } from '../../api/asana.api';
import { PrismaService } from '../../prisma/prisma.service';
import { CardsStrategy } from '../abstractions/cards.strategy.interface';
import { EdgeDto } from '../../cards/dto/edge.dto';
import { CardDto } from '../../cards/dto/card.dto';

export class AsanaCardsStrategy implements CardsStrategy {
  constructor(
    private readonly asanaApi: AsanaApi,
    private readonly prismaService: PrismaService,
  ) {}

  async getBoardCardEdges(userId: string, boardId: string): Promise<EdgeDto[]> {
    const asana = await this.asanaApi.createAsana(userId);
    const cards = await asana.tasks.getTasksForProject(boardId);
    return (
      await Promise.all(
        cards.data.map(async (card) =>
          (
            await asana.tasks.getDependentsForTask(card.gid)
          ).data.map((dependent) => ({
            from: card.gid,
            to: dependent.gid,
          })),
        ),
      )
    ).flat();
  }

  async getBoardCards(userId: string, boardId: string): Promise<CardDto[]> {
    const asana = await this.asanaApi.createAsana(userId);
    const cards = await asana.tasks.getTasksForProject(boardId);
    const project = await this.prismaService.project.findFirst({
      where: {
        userId: userId,
        boardId: boardId,
      },
    });
    await this.syncCards(project, cards.data);
    const carolineCardsPositions = await this.prismaService.card.findMany({
      where: {
        projectId: project.id,
      },
    });
    const cardsId = cards.data.map((card) => card.gid);
    const tasks = await Promise.all(
      cardsId.map(async (id) => await asana.tasks.getTask(id)),
    );
    return await Promise.all(
      tasks.map(async (card) => ({
        id: card.gid,
        title: card.name,
        workers: card.followers.map((follower) => follower.gid),
        tags: card.tags.map((tag) => tag.gid),
        position: {
          x: carolineCardsPositions.filter(
            (carolineCard) => carolineCard.cardId == card.gid,
          )[0].X,
          y: carolineCardsPositions.filter(
            (carolineCard) => carolineCard.cardId == card.gid,
          )[0].Y,
        },
        type: 'task',
        state: (await card.memberships[0].section).gid,
        description: card?.desc ?? '',
        url: card.url,
        shortLink: card.permalink_url,
        img: await this.getCover(userId, card.gid),
      })),
    );
  }

  private async getCover(userId: string, id: string) {
    const asana = await this.asanaApi.createAsana(userId);
    const attachment = (
      await asana.attachments.getAttachmentsForObject({
        parent: id,
      })
    ).data[0];
    return attachment
      ? (await asana.attachments.getAttachment(attachment.gid)).view_url
      : '';
  }

  private async syncCards(project: any, allCards: any) {
    const cards = await this.prismaService.card.findMany({
      where: {
        projectId: project.id,
      },
    });

    const deletedCards = cards.filter(
      (carolineCard) =>
        !allCards.map((apiCard) => apiCard.gid).includes(carolineCard.cardId),
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
            .includes(apiCard.gid),
      )
      .map((card) => {
        return {
          cardId: card.gid,
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
