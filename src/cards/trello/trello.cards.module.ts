import { Module } from '@nestjs/common';
import * as Trello from 'trello';
import { TrelloCardsController } from './trello.cards.controller';
import { TrelloCardsService } from './trello.cards.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrelloCardsController],
  providers: [TrelloCardsService, Trello],
})
export class TrelloCardsModule {}
