import { Injectable, NotImplementedException } from '@nestjs/common';
import { TrelloService } from '../../abstractions/trello.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectDto } from '../dto/project.dto';

@Injectable()
export class TrelloBoardsService extends TrelloService {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async addBoardByUrl(userId: string, boardUrl: string) {
    const trello = await this.createTrello(userId);
    const boards = await trello.getBoards('me');
    const boardFilteredArray = boards.filter((board) => board.url === boardUrl);
    if (boardFilteredArray.length === 0) {
      throw new NotImplementedException();
    }
    let project = await this.prismaService.project.findFirst({
      where: {
        boardId: boardFilteredArray[0].id,
      },
    });

    if (project !== null) {
      throw new NotImplementedException();
    }

    project = new ProjectDto();
    project.userId = userId;
    project.boardId = boardFilteredArray[0].id;
    project.serviceName = 'trello';
    return await this.prismaService.project.create({
      data: project,
    });
  }

  async getBoards(userId: string) {
    return await this.prismaService.project.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async deleteBoard(userId: string, boardId: string) {
    return await this.prismaService.project.deleteMany({
      where: {
        boardId: boardId,
        userId: userId,
      },
    });
  }

  async getBoardByBoardId(userId: string, boardId: string) {
    return await this.prismaService.project.findFirst({
      where: {
        userId: userId,
        boardId: boardId,
      },
    });
  }
}
