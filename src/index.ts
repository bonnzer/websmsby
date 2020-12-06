/*
 * Websms.by module
 * Exports all neccessary submodules for interaction with service:
 * - Account: balance, names, Viber names
 * - SMS: send textmessage
 */

import { Account } from './classes/Account';
import { SMS } from './classes/SMS';

export { Account, SMS };
