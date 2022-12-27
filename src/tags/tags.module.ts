import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TagsController } from './tags.controller';
import { TagsContext } from '../contexts/tags.context';
import { PrismaService } from '../prisma/prisma.service';
import { TrelloApi } from '../api/trello.api';
import { JiraApi } from '../api/jira.api';
import { AsanaApi } from '../api/asana.api';

@Module({
  imports: [PrismaModule],
  controllers: [TagsController],
  providers: [TagsContext, PrismaService, TrelloApi, JiraApi, AsanaApi],
})
export class TagsModule {}
