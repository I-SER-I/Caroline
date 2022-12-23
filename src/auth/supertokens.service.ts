import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import supertokens, { deleteUser } from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import { UsersService } from 'src/users/users.service';
import {
  AuthModuleConfig,
  ConfigInjectionToken,
} from './configs/config.interface';

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    private readonly usersService: UsersService,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionUri,
        apiKey: config.apiKey,
      },
      recipeList: [
        EmailPassword.init({
          signUpFeature: {
            formFields: [
              {
                id: 'username',
              },
              {
                id: 'fullname',
              },
            ],
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signUpPOST: async function (input) {
                  if (originalImplementation.signUpPOST === undefined) {
                    throw Error('Should never come here');
                  }

                  const response = await originalImplementation.signUpPOST(
                    input,
                  );

                  console.log(response);

                  if (response.status === 'OK') {
                    const { id, email } = response.user;
                    const formFields = input.formFields;

                    try {
                      const user = await usersService.create({
                        id,
                        email,
                        username: formFields.find(
                          (formItem) => formItem.id === 'username',
                        ).value,
                        fullName: formFields.find(
                          (formItem) => formItem.id === 'fullname',
                        ).value,
                      });

                      return response;
                    } catch (e) {
                      await deleteUser(id);
                      throw e;
                    }
                  }

                  return response;
                },
              };
            },
          },
        }),
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
