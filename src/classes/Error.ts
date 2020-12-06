import { ERROR_CODES } from '../constants/Response';

export class WebsmsError extends Error {
  constructor(message: string, errorCode: ERROR_CODES) {
    super(`Websms Error: ${errorCode} - ${message}`);
    this.name = 'WebsmsError';
  }
}
