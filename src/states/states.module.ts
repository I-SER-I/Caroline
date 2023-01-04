import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StatesController } from './states.controller';
import { StatesContext } from '../contexts/states.context';
import { PrismaService } from '../prisma/prisma.service';
import { TrelloApi } from '../api/trello.api';
import { JiraApi } from '../api/jira.api';
import { AsanaApi } from '../api/asana.api';

@Module({
  imports: [PrismaModule],
  controllers: [StatesController],
  providers: [StatesContext, PrismaService, TrelloApi, JiraApi, AsanaApi],
})
export class StatesModule {}
