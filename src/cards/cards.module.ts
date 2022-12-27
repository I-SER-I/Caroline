import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CardsController } from './cards.controller';
import { CardsContext } from '../contexts/cards.context';
import { PrismaService } from '../prisma/prisma.service';
import { TrelloApi } from '../api/trello.api';
import { JiraApi } from '../api/jira.api';
import { AsanaApi } from '../api/asana.api';

@Module({
  imports: [PrismaModule],
  controllers: [CardsController],
  providers: [CardsContext, PrismaService, TrelloApi, JiraApi, AsanaApi],
})
export class CardsModule {}
