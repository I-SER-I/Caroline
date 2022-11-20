import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrelloCardsService } from './trello.cards.service';
import { AuthGuard } from '../../auth/auth.guard';
import { Session } from '../../decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session';

@ApiTags('trello-cards')
@Controller('trello-cards')
export class TrelloCardsController {
  constructor(private readonly trelloCardsService: TrelloCardsService) {}

  @UseGuards(new AuthGuard())
  @Get('boards/:id')
  async getBoard(
    @Param('id') id: string,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();
    return await this.trelloCardsService.getCards(userId, id);
  }

  @UseGuards(new AuthGuard())
  @Get(':id/attachments')
  async getCardAttachments(
    @Param('id') id: string,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();
    return await this.trelloCardsService.getCardAttachment(userId, id);
  }
}
