import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TrelloModule } from './trello/trello.module';
import { CredentialsModule } from './credentials/credentials.module';

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
    TrelloModule,
    CredentialsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
