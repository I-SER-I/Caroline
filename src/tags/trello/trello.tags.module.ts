import { Module } from '@nestjs/common';
import * as Trello from 'trello';
import { TrelloTagsController } from './trello.tags.controller';
import { TrelloTagsService } from './trello.tags.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrelloTagsController],
  providers: [TrelloTagsService, Trello],
})
export class TrelloTagsModule {}
