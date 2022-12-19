import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TagsController } from './tags.controller';
import { TagsContext } from '../contexts/tags.context';
import { PrismaService } from '../prisma/prisma.service';
import { TrelloApi } from '../api/trello.api';
import { YouTrackApi } from '../api/youtrack.api';
import { JiraApi } from '../api/jira.api';

@Module({
  imports: [PrismaModule],
  controllers: [TagsController],
  providers: [TagsContext, PrismaService, TrelloApi, YouTrackApi, JiraApi],
})
export class TagsModule {}
