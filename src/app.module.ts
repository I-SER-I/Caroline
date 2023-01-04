import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CredentialsModule } from './credentials/credentials.module';
import { BoardsModule } from './boards/boards.module';
import { CardsModule } from './cards/cards.module';
import { MembersModule } from './members/members.module';
import { TagsModule } from './tags/tags.module';
import { StatesModule } from './states/states.module';

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
    CredentialsModule,
    BoardsModule,
    CardsModule,
    MembersModule,
    TagsModule,
    StatesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
