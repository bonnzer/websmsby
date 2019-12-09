/*
 * Account class for getting user info, i.e.
 *  - balance
 *  - prepaid card activation
 *  - user names
 *  - Viber user names
 */

import Client from './client.mjs';
import { accountValidator } from './validator.mjs';


class Account extends Client {
  /* Get user balance. No params */
  getBalance() {
    const path = `${Client.APIPATH}/user_balance`;
    const method = 'GET';

    return this.makeRequest({ path, method });
  }

  /* Get available sender names. No params */
  getUserNames() {
    const path = `${Client.APIPATH}/user_names`;
    const method = 'GET';

    return this.makeRequest({ path, method });
  }

  /* Get available Viber sender names. No params */
  getViberNames() {
    const path = `${Client.APIPATH}/viber_user_names`;
    const method = 'GET';

    return this.makeRequest({ path, method });
  }

  /**
  * Activates prepaid card
  * @param {string|required} cardNo - prepaid card number
  * @param {int|required} balanceType - 0: SMS, 1: Viber
  * @returns {Promise}
  */
  activatePayCard({ cardNo, balanceType }) {
    const errors = accountValidator.validate({ cardNo, balanceType });

    if (errors.length) {
      const reducer = (message, error) => `${message} ${error.message.charAt(0).toUpperCase()}${error.message.slice(1)}`;
      throw new Error(errors.reduce(reducer));
    }

    const path = `${Client.APIPATH}/paycard_activate`;
    const method = 'GET';

    return this.makeRequest({ path, method });
  }
}

export default Account;
