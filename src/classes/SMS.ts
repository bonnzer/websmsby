/*
 * SMS operations supported:
 *  - send SMS
 *  - send bulk
 *  - get cost
 *  - get bulk cost
 *  - set message status
 *  - all user messages
 */

import { Proxy } from './Proxy';

import { METHODS } from '../constants/Request';
import {
  SubmitParams,
  SendSMSPayload,
  GetSMSCostPayload,
  GetSMSListPayload,
  GetSMSStatusPayload,
} from '../types/Request';
import {
  SMSSendResponse,
  SMSGetCostResponse,
  SMSGetBulkCostResponse,
  SMSGetStatusResponse,
  SMSGetListResponse,
} from '../types/Response';

export class SMS extends Proxy {
  sendSMS(payload: SendSMSPayload): Promise<SMSSendResponse> {
    const path = `/msg_send`;
    const method = METHODS.GET;

    return this.submit(<SubmitParams>{ path, method, payload });
  }

  sendBulkSMS(payload: SendSMSPayload[]): Promise<SMSSendResponse> {
    const path = `/msg_send_bulk`;
    const method = METHODS.POST;

    return this.submit(<SubmitParams>{ path, method, payload });
  }

  getCost(payload: GetSMSCostPayload): Promise<SMSGetCostResponse> {
    const path = `/msg_cost`;
    const method = METHODS.GET;

    return this.submit(<SubmitParams>{ path, method, payload });
  }

  getBulkCost(payload: GetSMSCostPayload[]): Promise<SMSGetBulkCostResponse> {
    const path = `/msg_cost_bulk`;
    const method = METHODS.POST;

    return this.submit(<SubmitParams>{ path, method, payload });
  }

  getStatus(payload: GetSMSStatusPayload): Promise<SMSGetStatusResponse> {
    const path = `/msg_status`;
    const method = METHODS.GET;

    return this.submit({ path, method, payload });
  }

  getList(payload: GetSMSListPayload): Promise<SMSGetListResponse> {
    const path = `/msg_list`;
    const method = METHODS.GET;

    return this.submit(<SubmitParams>{ path, method, payload });
  }
}
