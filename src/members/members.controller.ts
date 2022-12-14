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
import { MembersContext } from '../contexts/members.context';
import { MemberDto } from './dto/member.dto';
import { TrelloApi } from '../api/trello.api';
import { TrelloMembersStrategy } from '../strategies/trello/trello.members.strategy';
import { JiraApi } from '../api/jira.api';
import { JiraMembersStrategy } from '../strategies/jira/jira.members.strategy';
import { AsanaApi } from '../api/asana.api';
import { AsanaMembersStrategy } from '../strategies/asana/asana.members.strategy';

@UseGuards(AuthGuard)
@Controller('boards')
@ApiTags('boards')
export class MembersController {
  constructor(
    private membersContext: MembersContext,
    private readonly trelloApi: TrelloApi,
    private readonly jiraApi: JiraApi,
    private readonly asanaApi: AsanaApi,
  ) {}

  @Get(':boardId/members')
  @ApiOperation({ summary: 'Get all members' })
  @ApiQuery({ name: 'type', enum: ProjectManagementSystemTypeEnum })
  @ApiOkResponse({
    description: 'Board members',
    type: [MemberDto],
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getBoardMembers(
    @Session() session: SessionContainer,
    @Query('type') type: ProjectManagementSystemTypeEnum,
    @Param('boardId') boardId: string,
  ): Promise<MemberDto[]> {
    const userId = session.getUserId();
    switch (type) {
      case ProjectManagementSystemTypeEnum.Trello:
        this.membersContext.membersStrategy = new TrelloMembersStrategy(
          this.trelloApi,
        );
        break;
      case ProjectManagementSystemTypeEnum.Jira:
        this.membersContext.membersStrategy = new JiraMembersStrategy(
          this.jiraApi,
        );
        break;
      case ProjectManagementSystemTypeEnum.Asana:
        this.membersContext.membersStrategy = new AsanaMembersStrategy(
          this.asanaApi,
        );
        break;
      default:
        return [];
    }
    return await this.membersContext.getBoardMembers(userId, boardId);
  }
}
