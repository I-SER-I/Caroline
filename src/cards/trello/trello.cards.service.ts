import { TrelloComponent } from '../../components/trello.component';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TrelloCardsService extends TrelloComponent {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  public async getCards(userId: string, boardId: string): Promise<any> {
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
      };
    });
  }

  public async getCardAttachment(
    userId: string,
    boardId: string,
    cardId: string,
  ): Promise<any> {
    const trello = await this.createTrello(userId);
    const attachments = await trello.getAttachmentsOnCard(cardId);
    const cards = await this.getCards(userId, boardId);
    //Тут нет картинок, потому что проверка на налл байт
    const links = attachments
      .filter(
        (attachment) =>
          attachment.url.includes('trello') && attachment.bytes === null,
      )
      .map((attachment) => attachment.url);

    const cardsUrlId = cards.map((card) => {
      return {
        id: card.id,
        url: card.url,
      };
    });

    const s = links.map((link) =>
      cardsUrlId.filter((card) => card.url.includes(link)),
    );
    const edge = s[0].map((i) => {
      return {
        source: cardId,
        target: i.id,
      };
    });
    return edge;
  }
}
