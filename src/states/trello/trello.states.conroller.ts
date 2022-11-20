import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { Session } from '../../decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session';
import { TrelloStatesService } from './trello.states.service';

@ApiTags('trello-states')
@Controller('trello-states')
export class TrelloStatesController {
  constructor(private readonly trelloStatesService: TrelloStatesService) {}

  @UseGuards(new AuthGuard())
  @Get('boards/:id')
  async getMembers(
    @Param('id') id: string,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();
    return await this.trelloStatesService.getBoardStates(userId, id);
  }
}
