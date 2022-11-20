import { TrelloComponent } from '../../components/trello.component';
import { PrismaService } from '../../prisma/prisma.service';

export class TrelloStatesService extends TrelloComponent {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  public async getBoardStates(userId: string, boardId: string) {
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
