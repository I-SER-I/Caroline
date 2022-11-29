import { AppInfo } from 'supertokens-node/types';

export const ConfigInjectionToken = 'ConfigInjectionToken';

export type AuthModuleConfig = {
  appInfo: AppInfo;
  connectionUri: string;
  apiKey?: string;
};
