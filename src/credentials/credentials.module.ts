import { Module } from '@nestjs/common';
import * as Trello from 'trello';
import { CredentialsController } from './credentials.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CredentialsService } from './credentials.service';

@Module({
  imports: [PrismaModule],
  controllers: [CredentialsController],
  providers: [CredentialsService, Trello],
})
export class CredentialsModule {}
