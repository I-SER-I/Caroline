import { Module } from '@nestjs/common';
import * as Trello from 'trello';
import { TrelloStatesController } from './trello.states.conroller';
import { TrelloStatesService } from './trello.states.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrelloStatesController],
  providers: [TrelloStatesService, Trello],
})
export class TrelloStatesModule {}
