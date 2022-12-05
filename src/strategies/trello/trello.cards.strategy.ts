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

  async getBoardCardEdges(
    userId: string,
    boardId: string,
    cardId: string,
  ): Promise<EdgeDto[]> {
    const trello = await this.trelloApi.createTrello(userId);
    const attachments = await trello.getAttachmentsOnCard(cardId);
    const trelloCards = await this.getBoardCards(userId, boardId);

    return attachments
      .filter(
        (attachment) =>
          attachment.url.includes('trello') && attachment.bytes === null,
      )
      .map((attachment) => attachment.url)
      .map((link) =>
        trelloCards
          .map((card) => {
            return {
              id: card.id,
              shortLink: card.shortLink,
            };
          })
          .filter((card) => link.includes(card.shortLink)),
      )
      .map((i) => {
        return {
          source: cardId,
          target: i[0].id,
        };
      });
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
    await this.syncCards(userId, boardId);
    const carolineCardsPositions = await this.prismaService.card.findMany({
      where: {
        projectId: project.id,
      },
    });
    return cards.map((card) => {
      return {
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
        img: card.cover?.scaled?.[3].url || null,
      };
    });
  }

  private async syncCards(userId: string, boardId: string) {
    const trello = await this.trelloApi.createTrello(userId);
    const allCards = await trello.getCardsOnBoard(boardId);
    const project = await this.prismaService.project.findFirst({
      where: {
        userId: userId,
        boardId: boardId,
      },
    });
    const cards = await this.prismaService.card.findMany({
      where: {
        projectId: project.id,
      },
    });

    const deletedCards = cards.filter(
      (carolineCard) =>
        !allCards.map((apiCard) => apiCard.id).includes(carolineCard.cardId),
    );
    console.log('deletedCards', deletedCards);

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
          X: Math.floor(Math.random() * 100) * 10,
          Y: Math.floor(Math.random() * 100) * 10,
        };
      });
    console.log('newCards', newCards);
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
