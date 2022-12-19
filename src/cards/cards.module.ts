import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CardsController } from './cards.controller';
import { CardsContext } from '../contexts/cards.context';
import { PrismaService } from '../prisma/prisma.service';
import { TrelloApi } from '../api/trello.api';
import { JiraApi } from '../api/jira.api';
import { YouTrackApi } from '../api/youtrack.api';

@Module({
  imports: [PrismaModule],
  controllers: [CardsController],
  providers: [CardsContext, PrismaService, TrelloApi, JiraApi, YouTrackApi],
})
export class CardsModule {}
