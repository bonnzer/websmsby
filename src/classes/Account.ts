import { Proxy } from './Proxy';

import { METHODS, BALANCE_TYPES } from '../constants/Request';
import { SubmitParams, AccountActivationCardPayload } from '../types/Request';
import {
  AccountActivationCardResponse,
  AccountBalanceResponse,
  AccountUsernamesResponse,
} from '../types/Response';

export class Account extends Proxy {
  public getBalance(): Promise<AccountBalanceResponse> {
    const path = `/user_balance`;
    const method = METHODS.GET;

    return this.submit(<SubmitParams>{ path, method });
  }

  /* Get available sender names. No params */
  public getUserNames(): Promise<AccountUsernamesResponse> {
    const path = `/user_names`;
    const method = METHODS.GET;

    return this.submit(<SubmitParams>{ path, method });
  }

  /* Get available Viber sender names. No params */
  public getViberNames(): Promise<AccountUsernamesResponse> {
    const path = `/viber_user_names`;
    const method = METHODS.GET;

    return this.submit(<SubmitParams>{ path, method });
  }

  /* Activates prepaid card */
  public activatePayCard(params: {
    cardNo: string;
    balanceType: BALANCE_TYPES;
  }): Promise<AccountActivationCardResponse> {
    const { cardNo, balanceType } = params;
    const path = `/paycard_activate`;
    const method = METHODS.GET;
    const payload: AccountActivationCardPayload = {
      cardno: cardNo,
      balance_type: balanceType,
    };

    return this.submit(<SubmitParams>{ path, method, payload });
  }
}
