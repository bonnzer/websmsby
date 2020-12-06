import { RequestOptions } from 'https';

import { Request } from './Request';
import { ProxyConfig } from '../types/ProxyConfig';
import { Response } from '../types/Response';
import { RequestCredentials, SubmitParams } from '../types/Request';
import { WEBSMS_GATEWAY, WEBSMS_API_PATH } from '../constants/Proxy';

export class Proxy {
  private hostname: string = WEBSMS_GATEWAY;

  private apiPath: string = WEBSMS_API_PATH;

  private user: string;

  private apiKey: string;

  public devKey: string | undefined;

  public testMode: boolean;

  constructor(config: ProxyConfig) {
    const { user, apiKey, testMode, devKey } = config;

    this.user = user;
    this.apiKey = apiKey;
    this.devKey = devKey;
    this.testMode = typeof testMode === 'undefined' ? true : testMode;
  }

  protected async submit(params: SubmitParams): Promise<Response> {
    const { user, apiKey, testMode, devKey, hostname, apiPath } = this;
    const { path, method, payload } = params;

    const credentials: RequestCredentials = {
      devkey: devKey,
      apikey: apiKey,
      test: testMode,
      user,
    };

    const options: RequestOptions = {
      method,
      hostname,
      headers: { 'Content-type': 'application/json' },
      path: `${apiPath}${path}`,
    };

    const request = new Request(options, credentials, payload);

    return request.invoke();
  }
}
