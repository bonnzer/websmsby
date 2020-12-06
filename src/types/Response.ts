/* eslint-disable camelcase */
import { ERROR_CODES, STATUSES } from '../constants/Response';

export type ErrorResponse = {
  success: STATUSES.ERROR;
  error: ERROR_CODES;
  message: string;
};

export type Success = {
  success: STATUSES.SUCCESS;
};

export type AccountBalanceResponse = Success & {
  balance: number;
  balance_viber: number;
};

export type AccountUsernamesResponse = Success & {
  default_name: string;
  names: Array<string>;
};

export type AccountActivationCardResponse = Success & {
  cardno: string;
};

export type Message = {
  custom_id: string;
  recipient: string;
  cost: number;
  parts: number;
};

export type MessageWithId = {
  id: number;
  status: string;
  updated_at: string;
};

export type MessagesReport = {
  id: number;
  bulk_id: number;
  sender: string;
  recipient: string;
  text: string;
  send_datetime: string;
  confirm_datetime: string;
  status: string;
  cost: number;
  parts: number;
};

export type SMSSendResponse = Success & {
  messages_id: string[];
  count: number;
  parts: number;
  amount: number;
  balance: number;
  test: number;
  urgent: number;
  custom_id?: string[];
};

export type SMSGetCostResponse = Success & {
  parts: number;
  amount: number;
  balance: number;
};

export type SMSGetBulkCostResponse = Success & {
  messages: Message[];
};

export type SMSGetStatusResponse = Success & {
  messages: Record<string, MessageWithId>;
};

export type SMSGetListResponse = Success & {
  messages: Record<string, MessagesReport>;
};

export type Response = AccountUsernamesResponse &
  AccountBalanceResponse &
  AccountActivationCardResponse &
  SMSSendResponse &
  SMSGetCostResponse &
  SMSGetStatusResponse &
  SMSGetBulkCostResponse &
  SMSGetListResponse;
