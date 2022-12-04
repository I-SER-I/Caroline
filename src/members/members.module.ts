import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MembersController } from './members.controller';
import { MembersContext } from '../contexts/members.context';
import { PrismaService } from '../prisma/prisma.service';
import { TrelloApi } from '../api/trello.api';
import { TrelloMembersStrategy } from '../strategies/trello/trello.members.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [MembersController],
  providers: [MembersContext, PrismaService, TrelloApi, TrelloMembersStrategy],
})
export class MembersModule {}
