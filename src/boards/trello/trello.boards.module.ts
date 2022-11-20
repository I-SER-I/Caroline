import { Module } from '@nestjs/common';
import * as Trello from 'trello';
import { TrelloBoardsController } from './trello.boards.controller';
import { TrelloBoardsService } from './trello.boards.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrelloBoardsController],
  providers: [TrelloBoardsService, Trello],
})
export class TrelloBoardsModule {}
