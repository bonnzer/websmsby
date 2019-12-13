/*
 * Request client for module entities
 * Handles request parameters and send them to the gateway
 */

const https = require('https');
const querystring = require('querystring');
const { clientValidator } = require('./validator.js');

const APIPATH = '/api';
/**
 * Example model.
 *
 * @module model/client
 */
class Client {
    #gateway = 'cp.websms.by';

    #devKey = 'UDR-85-LWM';

    #user;

    #apiKey;

    #testMode;


    /*
     * User and api key values are mandatory.
     * If you don't want to use my devkey, just pass 'false' by 4th parameter.
     */
    constructor({
      user, apiKey, testMode = false, devKey,
    } = {}) {
      if (clientValidator.validate({ user, apiKey }).length) throw new Error('Username and apikey required');

      this.#user = user;
      this.#apiKey = apiKey;
      this.#testMode = testMode;
      this.#devKey = devKey || this.#devKey;
    }

    static get APIPATH() {
      return APIPATH;
    }

    /**
    * Distributes passed params to the request options, i.e.
    * method, path, 'POST' data and 'GET' querystring
    * @returns {Promise}
    */
    makeRequest(params) {
      const query = {
        user: this.#user,
        apikey: this.#apiKey,
        test: this.#testMode,
      };

      if (this.#devKey) {
        query.devKey = this.#devKey;
      }

      if (params.method === 'GET') {
        Object.assign(query, params.args);
        query.recipients = query.recipients ? query.recipients.join() : undefined;
      }

      const options = {
        hostname: this.#gateway,
        header: { 'Content-type': 'application/json' },
        method: params.method,
        path: `${params.path}?${querystring.encode(query)}`,
      };

      return new Promise((resolve, reject) => {
        let response = '';

        const req = https
          .request(options, (res) => {
            res
              .on('data', (d) => { response += d; })
              .on('end', () => {
                try {
                  const encoded = JSON.parse(response);

                  return encoded.status === 'success'
                    ? resolve(encoded)
                    : reject(encoded);
                } catch (e) {
                  return reject(e);
                }
              });
          })
          .on('error', (error) => reject(error));

        if (options.method === 'POST') {
          req.write(JSON.stringify(params.args));
        }

        req.end();
      });
    }
}


module.exports = Client;
