import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { Session } from '../../decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session';
import { TrelloTagsService } from './trello.tags.service';

@ApiTags('trello-tags')
@Controller('trello-tags')
export class TrelloTagsController {
  constructor(private readonly trelloTagsService: TrelloTagsService) {}

  @UseGuards(new AuthGuard())
  @Get('boards/:id')
  async getMembers(
    @Param('id') id: string,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();
    return await this.trelloTagsService.getBoardTags(userId, id);
  }
}
