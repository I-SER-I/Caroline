import { TrelloComponent } from '../../components/trello.component';
import { PrismaService } from '../../prisma/prisma.service';

export class TrelloTagsService extends TrelloComponent {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async getBoardTags(userId: string, id: string) {
    const trello = await this.createTrello(userId);
    const labels = await trello.getLabelsForBoard(id);
    return labels.map((label) => {
      return {
        id: label.id,
        name: label.name,
        color: label.color.split('_')[0],
      };
    });
  }
}
