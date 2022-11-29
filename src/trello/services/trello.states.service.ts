import { Injectable } from '@nestjs/common';
import { TrelloService } from '../../abstractions/trello.interface';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TrelloStatesService extends TrelloService {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async getBoardStates(userId: string, boardId: string) {
    const trello = await this.createTrello(userId);
    const lists = await trello.getListsOnBoard(boardId);
    return lists.map((list) => {
      return {
        id: list.id,
        name: list.name,
      };
    });
  }
}
