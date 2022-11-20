import { Module } from '@nestjs/common';
import * as Trello from 'trello';
import { TrelloMembersController } from './trello.members.controller';
import { TrelloMembersService } from './trello.members.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrelloMembersController],
  providers: [TrelloMembersService, Trello],
})
export class TrelloMembersModule {}
