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
import { ProjectManagementSystemTypeEnum } from '../strategies/projectManagementSystemType.enum';
import { StatesContext } from '../contexts/states.context';
import { StateDto } from './dto/state.dto';
import { TrelloStatesStrategy } from '../strategies/trello/trello.states.strategy';
import { TrelloApi } from '../api/trello.api';

@UseGuards(AuthGuard)
@Controller('boards')
@ApiTags('boards')
export class StatesController {
  constructor(
    private stateContext: StatesContext,
    private readonly trelloApi: TrelloApi,
  ) {}

  @Get(':boardId/states')
  @ApiOperation({ summary: 'Get all states' })
  @ApiQuery({ name: 'type', enum: ProjectManagementSystemTypeEnum })
  @ApiOkResponse({
    description: 'Board states',
    type: [StateDto],
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getBoardStates(
    @Session() session: SessionContainer,
    @Query('type') type: ProjectManagementSystemTypeEnum,
    @Param('boardId') boardId: string,
  ): Promise<StateDto[]> {
    const userId = session.getUserId();
    switch (type) {
      case ProjectManagementSystemTypeEnum.Trello:
        this.stateContext.statesStrategy = new TrelloStatesStrategy(
          this.trelloApi,
        );
        break;
      default:
        return [];
    }
    return await this.stateContext.getBoardStates(userId, boardId);
  }
}
