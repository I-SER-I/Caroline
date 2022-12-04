import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BoardsController } from './boards.controller';
import { BoardsContext } from '../contexts/boards.context';
import { PrismaService } from '../prisma/prisma.service';
import { TrelloApi } from '../api/trello.api';
import { TrelloBoardsStrategy } from '../strategies/trello/trello.boards.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [BoardsController],
  providers: [BoardsContext, PrismaService, TrelloApi, TrelloBoardsStrategy],
})
export class BoardsModule {}
