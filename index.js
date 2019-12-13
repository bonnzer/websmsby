/*
 * Websms.by module
 * Exports all neccessary submodules for interaction with service:
 * - Account: balance, names, Viber names
 * - SMS: send textmessage
 */

const Account = require('./lib/account.js');
const SMS = require('./lib/sms.js');


exports.SMS = SMS;
exports.Account = Account;
