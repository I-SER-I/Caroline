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
import { TagsContext } from '../contexts/tags.context';
import { TagDto } from './dto/tag.dto';
import { TrelloTagsStrategy } from '../strategies/trello/trello.tags.strategy';
import { TrelloApi } from '../api/trello.api';
import { JiraTagsStrategy } from '../strategies/jira/jira.tags.strategy';
import { JiraApi } from '../api/jira.api';
import { YoutrackTagsStrategy } from '../strategies/youtrack/youtrack.tags.strategy';
import { YouTrackApi } from '../api/youtrack.api';

@UseGuards(AuthGuard)
@Controller('boards')
@ApiTags('boards')
export class TagsController {
  constructor(
    private tagsContext: TagsContext,
    private readonly trelloApi: TrelloApi,
    private readonly jiraApi: JiraApi,
    private readonly youtrackApi: YouTrackApi,
  ) {}

  @Get(':boardId/tags')
  @ApiOperation({ summary: 'Get all tags' })
  @ApiQuery({ name: 'type', enum: ProjectManagementSystemTypeEnum })
  @ApiOkResponse({
    description: 'Board tags',
    type: [TagDto],
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getBoardTags(
    @Session() session: SessionContainer,
    @Query('type') type: ProjectManagementSystemTypeEnum,
    @Param('boardId') boardId: string,
  ): Promise<TagDto[]> {
    const userId = session.getUserId();
    switch (type) {
      case ProjectManagementSystemTypeEnum.Trello:
        this.tagsContext.tagsStrategy = new TrelloTagsStrategy(this.trelloApi);
        break;
      case ProjectManagementSystemTypeEnum.Jira:
        this.tagsContext.tagsStrategy = new JiraTagsStrategy(this.jiraApi);
        break;
      case ProjectManagementSystemTypeEnum.YouTrack:
        this.tagsContext.tagsStrategy = new YoutrackTagsStrategy(
          this.youtrackApi,
        );
        break;
      default:
        return [];
    }
    return await this.tagsContext.getBoardTags(userId, boardId);
  }
}
