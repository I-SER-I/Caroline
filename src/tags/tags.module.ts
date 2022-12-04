import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TagsController } from './tags.controller';
import { TagsContext } from '../contexts/tags.context';
import { PrismaService } from '../prisma/prisma.service';
import { TrelloApi } from '../api/trello.api';
import { TrelloMembersStrategy } from '../strategies/trello/trello.members.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [TagsController],
  providers: [TagsContext, PrismaService, TrelloApi, TrelloMembersStrategy],
})
export class TagsModule {}
