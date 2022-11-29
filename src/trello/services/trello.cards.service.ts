import { Injectable } from '@nestjs/common';
import { TrelloService } from '../../abstractions/trello.interface';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TrelloCardsService extends TrelloService {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async syncCards(userId: string, boardId: string) {
    const trello = await this.createTrello(userId);
    const allCards = await trello.getCardsOnBoard(boardId);
    const cards = await this.prismaService.card.findMany({
      where: {
        projectId: boardId,
      },
    });

    const deletedCards = cards.filter(
      (carolineCard) =>
        !allCards.map((apiCard) => apiCard.id).includes(carolineCard.id),
    );

    for (const card of deletedCards) {
      await this.prismaService.card.delete({
        where: {
          id: card.id,
        },
      });
    }

    const newCards = allCards.filter(
      (apiCard) =>
        !cards.map((carolineCard) => carolineCard.id).includes(apiCard.id),
    );

    const randomXCoordinate = Math.floor(Math.random() * 100) * 10;
    const randomYCoordinate = Math.floor(Math.random() * 100) * 10;

    for (const card of newCards) {
      await this.prismaService.card.delete({
        where: {
          id: card.id,
        },
      });
    }
  }

  async getBoardCards(userId: string, boardId: string) {
    const trello = await this.createTrello(userId);
    const cards = await trello.getCardsOnBoard(boardId);
    return cards.map((card) => {
      return {
        id: card.id,
        title: card.name,
        workers: card.idMembers,
        tags: card.idLabels,
        type: 'task',
        state: card.idList,
        description: card.desc,
        url: card.url,
        shortLink: card.shortLink,
      };
    });
  }

  async getBoardCardsEdges(userId: string, boardId: string, cardId: string) {
    const trello = await this.createTrello(userId);
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
}
