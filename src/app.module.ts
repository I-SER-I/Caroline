import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { TrelloBoardsModule } from './boards/trello/trello.boards.module';
import { TrelloMembersModule } from './members/trello/trello.members.module';
import { TrelloCardsModule } from './cards/trello/trello.cards.module';
import { TrelloStatesModule } from './states/trello/trello.states.module';
import { TrelloTagsModule } from './tags/trello/trello.tags.module';

@Module({
  imports: [
    AuthModule.forRoot({
      connectionUri: process.env.AUTH_CONNECTION_URI,
      apiKey: process.env.AUTH_API_KEY,
      appInfo: {
        appName: process.env.AUTH_APP_NAME,
        apiDomain: process.env.AUTH_API_DOMAIN,
        websiteDomain: process.env.AUTH_WEBSITE_DOMAIN,
      },
    }),
    PrismaModule,
    UsersModule,
    TrelloBoardsModule,
    TrelloMembersModule,
    TrelloCardsModule,
    TrelloStatesModule,
    TrelloTagsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
