import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BoardsController } from './boards.controller';
import { BoardsContext } from '../contexts/boards.context';
import { PrismaService } from '../prisma/prisma.service';
import { TrelloApi } from '../api/trello.api';
import { JiraApi } from '../api/jira.api';
import { AsanaApi } from '../api/asana.api';

@Module({
  imports: [PrismaModule],
  controllers: [BoardsController],
  providers: [BoardsContext, PrismaService, TrelloApi, JiraApi, AsanaApi],
})
export class BoardsModule {}
