import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrelloBoardsService } from './services/trello.boards.service';
import { TrelloMembersService } from './services/trello.members.service';
import { TrelloStatesService } from './services/trello.states.service';
import { AuthGuard } from '../auth/auth.guard';
import { Session } from '../decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session';
import { TrelloTagsService } from './services/trello.tags.service';
import { ProjectDto } from './dto/project.dto';
import { MemberDto } from './dto/member.dto';
import { TrelloCardsService } from './services/trello.cards.service';

@ApiTags('trello')
@UseGuards(new AuthGuard())
@Controller('trello')
export class TrelloController {
  constructor(
    private readonly boardsService: TrelloBoardsService,
    private readonly membersService: TrelloMembersService,
    private readonly statesService: TrelloStatesService,
    private readonly tagsService: TrelloTagsService,
    private readonly cardsService: TrelloCardsService,
  ) {}

  @Post('boards/:url')
  async addBoard(
    @Param('url') url: string,
    @Session() session: SessionContainer,
  ): Promise<ProjectDto> {
    const userId = session.getUserId();
    return await this.boardsService.addBoardByUrl(userId, url);
  }

  @Get('boards')
  async getBoards(@Session() session: SessionContainer): Promise<ProjectDto[]> {
    const userId = session.getUserId();
    return await this.boardsService.getBoards(userId);
  }

  @Get('boards/:boardId')
  async getBoard(
    @Param('boardId') boardId: string,
    @Session() session: SessionContainer,
  ): Promise<ProjectDto> {
    const userId = session.getUserId();
    return await this.boardsService.getBoardByBoardId(userId, boardId);
  }

  @Delete('boards/:boardId')
  async deleteBoard(
    @Param('boardId') boardId: string,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();
    return await this.boardsService.deleteBoard(userId, boardId);
  }

  @Get('members/boards/:boardId')
  async getMembers(
    @Param('boardId') boardId: string,
    @Session() session: SessionContainer,
  ): Promise<MemberDto[]> {
    const userId = session.getUserId();
    return await this.membersService.getBoardMembers(userId, boardId);
  }

  @Get('states/boards/:boardId')
  async getStates(
    @Param('boardId') boardId: string,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();
    return await this.statesService.getBoardStates(userId, boardId);
  }

  @Get('tags/boards/:boardId')
  async getTags(
    @Param('boardId') boardId: string,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();
    return await this.tagsService.getBoardTags(userId, boardId);
  }

  @Get('cards/boards/:boardId')
  async getCards(
    @Param('boardId') boardId: string,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();
    return await this.cardsService.getBoardCards(userId, boardId);
  }

  @Get('cards/:cardId/boards/:boardId')
  async getEdges(
    @Param('cardId') cardId: string,
    @Param('boardId') boardId: string,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();
    return await this.cardsService.getBoardCardsEdges(userId, boardId, cardId);
  }
}
