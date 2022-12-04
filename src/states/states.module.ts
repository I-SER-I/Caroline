import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StatesController } from './states.controller';
import { StatesContext } from '../contexts/states.context';
import { PrismaService } from '../prisma/prisma.service';
import { TrelloApi } from '../api/trello.api';
import { TrelloStatesStrategy } from '../strategies/trello/trello.states.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [StatesController],
  providers: [StatesContext, PrismaService, TrelloApi, TrelloStatesStrategy],
})
export class StatesModule {}
