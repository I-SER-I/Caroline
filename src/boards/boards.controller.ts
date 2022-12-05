import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Session } from '../decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session';
import { ProjectManagementSystemTypeEnum } from '../strategies/projectManagementSystemType.enum';
import { PrismaService } from '../prisma/prisma.service';
import { BoardsContext } from '../contexts/boards.context';
import { BoardDto } from './dto/board.dto';
import { TrelloBoardsStrategy } from '../strategies/trello/trello.boards.strategy';
import { TrelloApi } from '../api/trello.api';

@UseGuards(AuthGuard)
@Controller('boards')
@ApiTags('boards')
export class BoardsController {
  constructor(
    private boardsContext: BoardsContext,
    private readonly prismaService: PrismaService,
    private readonly trelloApi: TrelloApi,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a board' })
  @ApiQuery({ name: 'type', enum: ProjectManagementSystemTypeEnum })
  @ApiOkResponse({
    description: 'Board added',
    type: BoardDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async addBoard(
    @Session() session: SessionContainer,
    @Query('type') type: ProjectManagementSystemTypeEnum,
    @Query('url') url: string,
  ): Promise<BoardDto> {
    const userId = session.getUserId();
    switch (type) {
      case ProjectManagementSystemTypeEnum.Trello:
        this.boardsContext.boardsStrategy = new TrelloBoardsStrategy(
          this.trelloApi,
          this.prismaService,
        );
        break;
      default:
        return null;
    }
    return await this.boardsContext.addBoardByUrl(userId, url);
  }

  @Get()
  @ApiOperation({ summary: 'Get boards' })
  @ApiQuery({ name: 'type', enum: ProjectManagementSystemTypeEnum })
  @ApiOkResponse({
    description: 'Boards',
    type: [BoardDto],
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getBoards(
    @Session() session: SessionContainer,
    @Query('type') type: ProjectManagementSystemTypeEnum,
  ): Promise<BoardDto[]> {
    const userId = session.getUserId();
    switch (type) {
      case ProjectManagementSystemTypeEnum.Trello:
        this.boardsContext.boardsStrategy = new TrelloBoardsStrategy(
          this.trelloApi,
          this.prismaService,
        );
        break;
      default:
        return [];
    }
    return await this.boardsContext.getBoards(userId);
  }

  @Get(':boardId')
  @ApiOperation({ summary: 'Get board by board id' })
  @ApiQuery({ name: 'type', enum: ProjectManagementSystemTypeEnum })
  @ApiOkResponse({
    description: 'Board',
    type: BoardDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getBoard(
    @Session() session: SessionContainer,
    @Query('type') type: ProjectManagementSystemTypeEnum,
    @Param('boardId') boardId: string,
  ): Promise<BoardDto> {
    const userId = session.getUserId();
    switch (type) {
      case ProjectManagementSystemTypeEnum.Trello:
        this.boardsContext.boardsStrategy = new TrelloBoardsStrategy(
          this.trelloApi,
          this.prismaService,
        );
        break;
      default:
        return null;
    }
    return await this.boardsContext.getBoardByBoardId(userId, boardId);
  }

  @Delete(':boardId')
  @ApiOperation({ summary: 'Delete board by board id' })
  @ApiQuery({ name: 'type', enum: ProjectManagementSystemTypeEnum })
  @ApiOkResponse({
    description: 'Board deleted',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async deleteBoard(
    @Session() session: SessionContainer,
    @Query('type') type: ProjectManagementSystemTypeEnum,
    @Param('boardId') boardId: string,
  ): Promise<BoardDto> {
    const userId = session.getUserId();
    switch (type) {
      case ProjectManagementSystemTypeEnum.Trello:
        this.boardsContext.boardsStrategy = new TrelloBoardsStrategy(
          this.trelloApi,
          this.prismaService,
        );
        break;
      default:
        return;
    }
    return await this.boardsContext.deleteBoard(userId, boardId);
  }
}
