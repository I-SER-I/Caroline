import { Injectable } from '@nestjs/common';
import { TrelloService } from '../../abstractions/trello.interface';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TrelloTagsService extends TrelloService {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async getBoardTags(userId: string, boardId: string) {
    const trello = await this.createTrello(userId);
    const labels = await trello.getLabelsForBoard(boardId);
    return labels.map((label) => {
      return {
        id: label.id,
        name: label.name,
        color: label.color.split('_')[0],
      };
    });
  }
}
