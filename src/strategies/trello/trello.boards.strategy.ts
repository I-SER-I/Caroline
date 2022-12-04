import { Injectable, NotImplementedException } from '@nestjs/common';
import { TrelloApi } from '../../api/trello.api';
import { PrismaService } from '../../prisma/prisma.service';
import { BoardsStrategy } from '../abstractions/boards.strategy.interface';
import { BoardDto } from '../../boards/dto/board.dto';

@Injectable()
export class TrelloBoardsStrategy implements BoardsStrategy {
  constructor(
    private readonly trelloApi: TrelloApi,
    private readonly prismaService: PrismaService,
  ) {}

  async addBoardByUrl(userId: string, boardUrl: string) {
    const trello = await this.trelloApi.createTrello(userId);
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

    project = new BoardDto();
    project.userId = userId;
    project.boardId = boardFilteredArray[0].id;
    project.title = boardFilteredArray[0].name;
    project.serviceName = 'trello';
    return await this.prismaService.project.create({
      data: project,
    });
  }

  async deleteBoard(userId: string, boardId: string): Promise<any> {
    return await this.prismaService.project.deleteMany({
      where: {
        boardId: boardId,
        userId: userId,
      },
    });
  }

  async getBoardByBoardId(userId: string, boardId: string): Promise<BoardDto> {
    return await this.prismaService.project.findFirst({
      where: {
        userId: userId,
        boardId: boardId,
      },
    });
  }

  async getBoards(userId: string): Promise<BoardDto[]> {
    return await this.prismaService.project.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
