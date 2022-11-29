import { Module } from '@nestjs/common';
import { TrelloController } from './trello.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TrelloBoardsService } from './services/trello.boards.service';
import { TrelloMembersService } from './services/trello.members.service';
import { TrelloStatesService } from './services/trello.states.service';
import { TrelloTagsService } from './services/trello.tags.service';
import { TrelloCardsService } from './services/trello.cards.service';

@Module({
  imports: [PrismaModule],
  controllers: [TrelloController],
  providers: [
    TrelloBoardsService,
    TrelloMembersService,
    TrelloStatesService,
    TrelloTagsService,
    TrelloCardsService,
  ],
})
export class TrelloModule {}
