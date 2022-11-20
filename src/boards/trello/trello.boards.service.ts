import { Injectable } from '@nestjs/common';
import { TrelloProjectDto } from './dto/trello.project.dto';
import { TrelloComponent } from '../../components/trello.component';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TrelloBoardsService extends TrelloComponent {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  public async addBoard(userId: string, url: string) {
    const project = new TrelloProjectDto();
    project.boardId = await this.getRawBoard(userId, url);
    if (!project.boardId) {
      return;
    }
    project.userId = userId;
    return await this.prismaService.project.create({
      data: project,
    });
  }

  public async getBoards(userId: string): Promise<TrelloProjectDto[]> {
    return await this.prismaService.project.findMany({
      where: {
        userId: userId,
        serviceName: 'trello',
      },
    });
  }

  public async getBoard(id: string): Promise<TrelloProjectDto> {
    return await this.prismaService.project.findFirst({
      where: {
        boardId: id,
      },
    });
  }

  private async getRawBoards(userId: string): Promise<any> {
    const trello = await this.createTrello(userId);
    return await trello.getBoards('me');
  }

  private async getRawBoard(userId: string, url: string): Promise<any> {
    const boards = await this.getRawBoards(userId);
    return boards.filter((board) => board.url === url)[0].id;
  }
}
