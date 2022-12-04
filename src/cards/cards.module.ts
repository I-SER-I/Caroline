import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CardsController } from './cards.controller';
import { CardsContext } from '../contexts/cards.context';
import { PrismaService } from '../prisma/prisma.service';
import { TrelloApi } from '../api/trello.api';
import { TrelloCardsStrategy } from '../strategies/trello/trello.cards.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [CardsController],
  providers: [CardsContext, PrismaService, TrelloApi, TrelloCardsStrategy],
})
export class CardsModule {}
