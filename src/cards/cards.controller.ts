import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Session } from '../decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectManagementSystemTypeEnum } from '../strategies/projectManagementSystemType.enum';
import { CardsContext } from '../contexts/cards.context';
import { CardDto } from './dto/card.dto';
import { EdgeDto } from './dto/edge.dto';
import { TrelloCardsStrategy } from '../strategies/trello/trello.cards.strategy';
import { TrelloApi } from '../api/trello.api';
import { JiraApi } from '../api/jira.api';
import { JiraCardsStrategy } from '../strategies/jira/jira.cards.starategy';
import { AsanaApi } from '../api/asana.api';
import { AsanaCardsStrategy } from '../strategies/asana/asana.cards.strategy';

@UseGuards(AuthGuard)
@Controller('boards')
@ApiTags('boards')
export class CardsController {
  constructor(
    private cardsContext: CardsContext,
    private readonly prismaService: PrismaService,
    private readonly trelloApi: TrelloApi,
    private readonly jiraApi: JiraApi,
    private readonly asanaApi: AsanaApi,
  ) {}

  @Get(':boardId/cards')
  @ApiOperation({ summary: 'Get all cards' })
  @ApiQuery({ name: 'type', enum: ProjectManagementSystemTypeEnum })
  @ApiOkResponse({
    description: 'Board cards',
    type: [CardDto],
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getCards(
    @Session() session: SessionContainer,
    @Query('type') type: ProjectManagementSystemTypeEnum,
    @Param('boardId') boardId: string,
  ): Promise<CardDto[]> {
    const userId = session.getUserId();
    switch (type) {
      case ProjectManagementSystemTypeEnum.Trello:
        this.cardsContext.cardsStrategy = new TrelloCardsStrategy(
          this.trelloApi,
          this.prismaService,
        );
        break;
      case ProjectManagementSystemTypeEnum.Jira:
        this.cardsContext.cardsStrategy = new JiraCardsStrategy(
          this.jiraApi,
          this.prismaService,
        );
        break;
      case ProjectManagementSystemTypeEnum.Asana:
        this.cardsContext.cardsStrategy = new AsanaCardsStrategy(
          this.asanaApi,
          this.prismaService,
        );
        break;
      default:
        return [];
    }
    return await this.cardsContext.getBoardCards(userId, boardId);
  }

  @Get(':boardId/edges')
  @ApiOperation({ summary: 'Get all edges' })
  @ApiQuery({ name: 'type', enum: ProjectManagementSystemTypeEnum })
  @ApiOkResponse({
    description: 'Board card edges',
    type: [EdgeDto],
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getEdges(
    @Session() session: SessionContainer,
    @Query('type') type: ProjectManagementSystemTypeEnum,
    @Param('boardId') boardId: string,
  ): Promise<EdgeDto[]> {
    const userId = session.getUserId();
    switch (type) {
      case ProjectManagementSystemTypeEnum.Trello:
        this.cardsContext.cardsStrategy = new TrelloCardsStrategy(
          this.trelloApi,
          this.prismaService,
        );
        break;
      case ProjectManagementSystemTypeEnum.Jira:
        this.cardsContext.cardsStrategy = new JiraCardsStrategy(
          this.jiraApi,
          this.prismaService,
        );
        break;
      case ProjectManagementSystemTypeEnum.Asana:
        this.cardsContext.cardsStrategy = new AsanaCardsStrategy(
          this.asanaApi,
          this.prismaService,
        );
        break;
      default:
        return [];
    }
    return await this.cardsContext.getBoardCardEdges(userId, boardId);
  }
}
