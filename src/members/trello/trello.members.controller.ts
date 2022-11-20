import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TrelloMembersService } from './trello.members.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { Session } from '../../decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session';

@ApiTags('trello-members')
@Controller('trello-members')
export class TrelloMembersController {
  constructor(private readonly trelloMembersService: TrelloMembersService) {}

  @UseGuards(new AuthGuard())
  @Get('boards/:id')
  async getMembers(
    @Param('id') id: string,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();
    return await this.trelloMembersService.getBoardMembers(userId, id);
  }
}
