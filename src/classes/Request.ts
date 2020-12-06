import http from 'http';
import * as querystring from 'querystring';

import { WebsmsError } from './Error';
import { ErrorResponse, Response } from '../types/Response';
import { METHODS } from '../constants/Request';
import { Payload, RequestCredentials } from '../types/Request';

export class Request {
  private response = '';

  private options: http.RequestOptions;

  private data: string;

  constructor(
    options: http.RequestOptions,
    credentials: RequestCredentials,
    payload?: Payload,
  ) {
    const { method } = options;

    this.options = options;

    if (method === METHODS.GET) {
      const modifiedPayload: Record<string, unknown> = {};

      if (typeof payload !== 'undefined' && !Array.isArray(payload)) {
        const keys = Object.keys(payload);

        Object.values(payload).forEach((value, i) => {
          modifiedPayload[keys[i]] = Array.isArray(value)
            ? value.join(',')
            : value;
        });
      }

      this.options.path += `?${querystring.encode({
        ...credentials,
        ...modifiedPayload,
      })}`;

      this.data = '';
    } else {
      this.data = JSON.stringify({ ...credentials, ...payload });
      this.options.headers = {
        ...this.options.headers,
        'Content-length': this.data.length,
      };
    }
  }

  private handleData(d: string) {
    this.response += d;
  }

  public invoke(): Promise<Response> {
    return new Promise((resolve, reject) => {
      const req = http
        .request({ ...this.options }, (res) => {
          res.on('data', this.handleData).on('end', () => {
            try {
              const encoded: Response | ErrorResponse = JSON.parse(
                this.response,
              );

              return 'message' in encoded
                ? reject(new WebsmsError(encoded.message, encoded.error))
                : resolve(encoded);
            } catch (e) {
              return reject(e);
            }
          });
        })
        .on('error', (error) => reject(error));

      if (this.options.method === METHODS.POST) {
        req.write(this.data);
      }

      req.end();
    });
  }
}
