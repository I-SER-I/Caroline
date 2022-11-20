import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';
import { SupertokensService } from './supertokens.service';
import {
  AuthModuleConfig,
  ConfigInjectionToken,
} from './configs/config.interface';

@Module({
  imports: [],
  controllers: [],
  providers: [SupertokensService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot({
    appInfo,
    connectionUri,
    apiKey,
  }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionUri,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
      ],
      exports: [],
      imports: [],
      module: AuthModule,
    };
  }
}
