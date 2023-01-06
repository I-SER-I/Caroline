import { BadRequestException, Injectable } from '@nestjs/common';
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
      throw new BadRequestException('Board not found');
    }
    const project = await this.prismaService.project.findFirst({
      where: {
        userId: userId,
        boardId: boardFilteredArray[0].id,
      },
    });

    if (project !== null) {
      throw new BadRequestException('Board already exists');
    }
    console.log(boardUrl);
    return await this.prismaService.project.create({
      data: {
        userId: userId,
        boardId: boardFilteredArray[0].id,
        title: boardFilteredArray[0].name,
        url: boardUrl,
        serviceName: 'trello',
      },
    });
  }

  async deleteBoard(userId: string, boardId: string): Promise<any> {
    return await this.prismaService.project.deleteMany({
      where: {
        userId: userId,
        boardId: boardId,
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
