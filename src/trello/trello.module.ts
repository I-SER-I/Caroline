import { Module } from '@nestjs/common';
import { TrelloController } from './trello.controller';
import { TrelloService } from './trello.service';
import * as Trello from 'trello';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrelloController],
  providers: [TrelloService, Trello],
})
export class TrelloModule {}
