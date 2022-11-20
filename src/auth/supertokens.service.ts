import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import {
  AuthModuleConfig,
  ConfigInjectionToken,
} from './configs/config.interface';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionUri,
        apiKey: config.apiKey,
      },
      recipeList: [
        EmailPassword.init(),
        Session.init({
          errorHandlers: {
            onUnauthorised: async (_, request, response) => {
              throw new UnauthorizedException();
            },
          },
        }),
      ],
    });
  }
}
