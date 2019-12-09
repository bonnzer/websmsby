/*
 * Websms.by module
 * Exports all neccessary submodules for interaction with service:
 * - Account: balance, names, Viber names
 * - SMS: send textmessage
 */


import Account from './lib/account.mjs';
import SMS from './lib/sms.mjs';


export { Account, SMS };
