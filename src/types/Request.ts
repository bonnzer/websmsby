/* eslint-disable camelcase */
import { METHODS, BALANCE_TYPES } from '../constants/Request';

export type AccountActivationCardPayload = {
  cardno: string;
  balance_type: BALANCE_TYPES;
};

export type SendSMSPayload = {
  recipients: string | string[];
  message: string;
  sender: string;
  urgent?: 0 | 1;
  sendtime?: string;
};

export type GetSMSStatusPayload = {
  messages_id: string | string[];
};

export type GetSMSCostPayload = {
  recipients: string | string[];
  message: string;
};

export type GetSMSListPayload = {
  messages_id?: string | string[];
  bulk_id?: number;
  recipients?: string[];
  sender?: string | string[];
  status?: string;
  date_from?: string;
  date_to?: string;
  limit?: number;
  offset?: number;
  sort?: 'asc' | 'desc';
};

export type RequestCredentials = {
  user: string;
  apikey: string;
  test?: boolean;
  devkey?: string;
};

export type Payload =
  | AccountActivationCardPayload
  | SendSMSPayload
  | SendSMSPayload[]
  | GetSMSCostPayload
  | GetSMSListPayload
  | GetSMSStatusPayload
  | undefined;

export type SubmitParams = {
  method: METHODS;
  path: string;
  payload?: Payload;
};
