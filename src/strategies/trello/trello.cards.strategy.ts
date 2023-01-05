import { Injectable } from '@nestjs/common';
import { TrelloApi } from '../../api/trello.api';
import { PrismaService } from '../../prisma/prisma.service';
import { CardsStrategy } from '../abstractions/cards.strategy.interface';
import { EdgeDto } from '../../cards/dto/edge.dto';

@Injectable()
export class TrelloCardsStrategy implements CardsStrategy {
  constructor(
    private readonly trelloApi: TrelloApi,
    private readonly prismaService: PrismaService,
  ) {}

  async getBoardCardEdges(userId: string, boardId: string): Promise<EdgeDto[]> {
    const trello = await this.trelloApi.createTrello(userId);
    const trelloCards = await this.getBoardCards(userId, boardId);
    const trelloCardMap: Map<string, any> = new Map();
    trelloCards.forEach((card) => {
      trelloCardMap.set(card.url, card.id);
    });

    const edges = [];
    for (const trelloCard of trelloCards) {
      const attachments = await trello.getAttachmentsOnCard(trelloCard.id);
      const cardAttachmentsLinks = attachments
        .filter(
          (attachment) =>
            attachment.url.includes('trello') && attachment.bytes === null,
        )
        .map((attachment) => attachment.url);
      if (cardAttachmentsLinks.length !== 0) {
        const edge = cardAttachmentsLinks.flatMap((link) => ({
          source: trelloCard.id,
          target: trelloCardMap.get(link),
        }));
        edges.push(edge);
      }
    }
    return edges.flatMap((edge) => edge);
  }

  async getBoardCards(userId: string, boardId: string): Promise<any> {
    const trello = await this.trelloApi.createTrello(userId);
    const cards = await trello.getCardsOnBoard(boardId);
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
    return await Promise.all(
      cards.map(async (card) => ({
        id: card.id,
        title: card.name,
        workers: card.idMembers,
        tags: card.idLabels,
        position: {
          x: carolineCardsPositions.filter(
            (carolineCard) => carolineCard.cardId == card.id,
          )[0].X,
          y: carolineCardsPositions.filter(
            (carolineCard) => carolineCard.cardId == card.id,
          )[0].Y,
        },
        type: 'task',
        state: card.idList,
        description: card.desc,
        url: card.url,
        shortLink: card.shortLink,
        img: await this.getCover(userId, card.id),
      })),
    );
  }

  private async getCover(userId: string, cardId: string): Promise<string> {
    const trello = await this.trelloApi.createTrello(userId);
    const attachments = await trello.getAttachmentsOnCard(cardId);

    const url = attachments.filter(
      (attachment) => attachment.isUpload === true,
    )[0]?.previews?.[4]?.url;
    return url ? url : '';
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
