import { BoardsStrategy } from '../abstractions/boards.strategy.interface';
import { YouTrackApi } from '../../api/youtrack.api';
import { BoardDto } from '../../boards/dto/board.dto';
import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export class YoutrackBoardsStrategy implements BoardsStrategy {
  constructor(
    private readonly youtrackApi: YouTrackApi,
    private readonly prismaService: PrismaService,
  ) {}

  async addBoardByUrl(userId: string, boardUrl: string): Promise<BoardDto> {
    const youtrack = await this.youtrackApi.createYoutrack(userId);
    const url = boardUrl.split('agiles/')[1].split('/current')[0];
    let youtrackBoard;
    try {
      youtrackBoard = await youtrack.agiles.byId(url);
    } catch (e) {
      throw new BadRequestException('Board not found');
    }
    const carolineBoard = await this.prismaService.project.findFirst({
      where: {
        userId: userId,
        boardId: youtrackBoard.id,
      },
    });
    if (carolineBoard !== null) {
      throw new BadRequestException('Board already exists');
    }
    const board = new BoardDto();
    board.userId = userId;
    board.boardId = youtrackBoard.id;
    board.title = youtrackBoard.name;
    board.serviceName = 'youtrack';
    return await this.prismaService.project.create({
      data: board,
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
