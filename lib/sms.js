/*
 * SMS operations supported:
 *  - send SMS
 *  - send bulk
 *  - get cost
 *  - get bulk cost
 *  - set message status
 *  - all user messages
 */

const Client = require('./client.js');
const { SMSValidators } = require('./validator.js');


/* eslint class-methods-use-this: ["error", { "exceptMethods": ["validateParams"] }] */
class SMS extends Client {
  /**
  * Handles and throws Errors if it exists
  */
  validateParams(validators, { ...args }) {
    const errors = [];

    validators.forEach((validator) => {
      const constArgs = { ...args }; // because of object mutation in process of validation
      errors.push(SMSValidators[validator].validate(constArgs));
    });

    if (args.customId && args.customId !== args.recipients.length) {
      errors.push([new Error('CustomId should be equal to recipients.length')]);
    }

    if (errors.flat().length) {
      const reducer = (message, error) => `${message} ${error.message.charAt(0).toUpperCase()}${error.message.slice(1)}`;
      throw new Error(errors.flat().reduce(reducer));
    }
  }

  /**
  * Send SMS to certain recipients
  * @param {array[string]|required} recipients - recipient phone number, or array of phone numbers
  * @param {string|required} message - utf-8 message text
  * @param {string|required} sender - sender name, 11-symbols max-length
  * @param {boolean} urgent - urgent flag
  * @param {boolean} customId - additional check for recipients array length
  *                             (have to be equal to recipients.length)
  * @returns {Promise}
  */
  sendSMS({ ...args } = {}) {
    this.validateParams(['recipients', 'message', 'sender'], { ...args });

    const path = `${Client.APIPATH}/msg_send`;
    const method = 'GET';

    return this.makeRequest({ path, method, args });
  }

  /**
  * Send bulk SMS
  * @param {messages|required} messages - array of messages with format:
  *                               [{
  *                                  recipient: string,
  *                                  message: string,
  *                                  sender: string},
  *                                 { ... }]
  * @returns {Promise}
  */
  sendBulkSMS({ ...args } = {}) {
    this.validateParams(['messages'], { ...args });

    const path = `${Client.APIPATH}/msg_send_bulk`;
    const method = 'POST';

    return this.makeRequest({ path, method, args });
  }

  /**
  * Get cost of certain SMS to certain recipients
  * @param {array[string]|required} recipients - array of phone numbers
  * @param {string|required} message - utf-8 message text
  * @returns {Promise}
  */
  getCost({ ...args } = {}) {
    this.validateParams(['recipients', 'message'], { ...args });

    const path = `${Client.APIPATH}/msg_cost`;
    const method = 'GET';

    return this.makeRequest({ path, method, args });
  }

  /**
  * Get cost of sending bulk of SMS
  * @param {messages|required} messages - array of messages with format:
  *                               [{
  *                                  recipient: string,
  *                                  message: string,
  *                                  sender: string},
  *                                 { ... }]
  * @returns {Promise}
  */
  getBulkCost({ ...args } = {}) {
    this.validateParams(['messages'], { ...args });

    const path = `${Client.APIPATH}/msg_cost_bulk`;
    const method = 'POST';

    return this.makeRequest({ path, method, args });
  }

  /**
  * Get status of sent SMS
  * @param {array[int]|required} messagesIds - array of SMS Ids <= 10
  * @returns {Promise}
  */
  getStatus({ ...args } = {}) {
    this.validateParams(['messagesIds'], { ...args });

    const path = `${Client.APIPATH}/msg_status`;
    const method = 'GET';

    return this.makeRequest({ path, method, args });
  }

  /**
  * Get list of all sent SMS messages with filters. All fields are optional.
  * @param {array[string]} messagesIds - filter by SMS Ids
  * @param {int} bulkId - filter by sent bulk Id
  * @param {array[string]} recipients - filter by array of numbers
  * @param {string} sender - filter by sender name
  * @param {string} status - filter by status
  * @param {string} dateFrom - filter by date. Format: yyyy-mm-dd hh:ii:ss
  * @param {string} dateTo - filter by date. Format: yyyy-mm-dd hh:ii:ss
  * @param {int} limit - limit request. Max limit <= 1000. Default 1000.
  * @param {int} offset - skip records. Default 0.
  * @param {string} sort - sort direction. 'asc', 'desc' available.
  * @returns {Promise}
  */
  getList({ ...args } = {}) {
    const path = `${Client.APIPATH}/msg_list`;
    const method = 'GET';

    return this.makeRequest({ path, method, args });
  }
}


module.exports = SMS;
