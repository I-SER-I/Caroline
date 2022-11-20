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
    return trello.getCardsOnBoard(boardId);
  }

  public async getCardAttachment(userId: string, cardId: string): Promise<any> {
    const trello = await this.createTrello(userId);
    return trello.getAttachmentsOnCard(cardId);
  }
}
//TODO: Получить карточки --> Сохраняем ID
