import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MembersController } from './members.controller';
import { MembersContext } from '../contexts/members.context';
import { PrismaService } from '../prisma/prisma.service';
import { TrelloApi } from '../api/trello.api';
import { JiraApi } from '../api/jira.api';
import { AsanaApi } from '../api/asana.api';

@Module({
  imports: [PrismaModule],
  controllers: [MembersController],
  providers: [MembersContext, PrismaService, TrelloApi, JiraApi, AsanaApi],
})
export class MembersModule {}
