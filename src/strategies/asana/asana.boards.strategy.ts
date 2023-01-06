import { AsanaApi } from '../../api/asana.api';
import { PrismaService } from '../../prisma/prisma.service';
import { BoardsStrategy } from '../abstractions/boards.strategy.interface';
import { BoardDto } from '../../boards/dto/board.dto';
import { BadRequestException } from '@nestjs/common';

export class AsanaBoardsStrategy implements BoardsStrategy {
  constructor(
    private readonly asanaApi: AsanaApi,
    private readonly prismaService: PrismaService,
  ) {}

  async addBoardByUrl(userId: string, boardUrl: string): Promise<BoardDto> {
    const asana = await this.asanaApi.createAsana(userId);
    const boardId = boardUrl.split('/').slice(-2, -1).pop();
    let board;
    try {
      board = await asana.projects.getProject(boardId);
    } catch (e) {
      throw new BadRequestException('Board not found');
    }
    const project = await this.prismaService.project.findFirst({
      where: {
        userId: userId,
        boardId: boardId,
      },
    });

    if (project !== null) {
      throw new BadRequestException('Board already exists');
    }
    return await this.prismaService.project.create({
      data: {
        userId: userId,
        boardId: boardId,
        title: board.name,
        url: boardUrl,
        serviceName: 'asana',
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
