import { BoardsStrategy } from '../abstractions/boards.strategy.interface';
import { BoardDto } from '../../boards/dto/board.dto';
import { JiraApi } from '../../api/jira.api';
import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

export class JiraBoardsStrategy implements BoardsStrategy {
  constructor(
    private readonly jiraApi: JiraApi,
    private readonly prismaService: PrismaService,
  ) {}

  async addBoardByUrl(userId: string, boardUrl: string): Promise<BoardDto> {
    const jira = await this.jiraApi.createJira(userId);
    const boardId = boardUrl.split('/').pop();
    let board;
    try {
      board = await jira.board.getBoard({ boardId: boardId });
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
        serviceName: 'jira',
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
