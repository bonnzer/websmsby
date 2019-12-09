# Description
[![Build Status](https://travis-ci.org/bonnzer/websmsby.svg?branch=master)](https://travis-ci.org/bonnzer/websmsby)
The Node.js module for [websms.by](http://websms.by/) service.
Currently supports only two main segments of functionality:

  - work with account's data
  - sending SMS functions

# Installation

Module requires [Node.js](https://nodejs.org/) v13.3+ to run (with full modules support, due the Node.js v14 release is already near), or v8.5+ with `--experimental-modules` flag.

```sh
$ npm install websmsby
```

# Usage and parameters
In total, usage of module is similar to native [docs](http://cp.websms.by/apidocs/) (function names and parameters). 
All methods return Promises. 
Constructor requires 4 params. `user` and `apiKey` params are mandatory, `testMode` and `devKey` are not. Simple example:
```
import { Account } from 'websmsby';
const account = new Account({ user: 'yourmail@here.com', apiKey: 'somekey' });
account.getBalance().then().catch((e)..
```

```
import { SMS } from 'websmsby';
const gateway = new Account({ user: 'yourmail@here.com', apiKey: 'somekey', testMode: true, devKey: false });
gateway.sendSMS({ recipients: ['375291111111', '375292222222'], message: 'hello, world!', sender: 'myname'});
```
#### Account
- `getBalance()`
- `getUserNames()`
- `getViberNames()`
- `activatePayCard({ cardNo: string, balanceType: 0 || 1 })`
#### SMS
- `sendSMS({ recipients: string[], message: string, sender: string })`
- `sendBulkSMS({ messages: [ { recipient: string, message: string, sender: string }, {...} ] })`
- `getCost({ recipients: string[], message: string })`
- `getBulkCost({ messages: [ { recipient: string, message: string, sender: string }, {...} ] })`
- `getStatus({ messagesIds: int[] })`
- `getList({ messagesIds: int[], bulkId: int, recipients: string[], sender: string, status: string, dateFrom:yyyy-mm-dd hh:ii:ss, dateTo: yyyy-mm-dd hh:ii:ss, limit: int, offset: int, sort: 'asc' || 'desc' })`

#### devKey
Every downloaded & used module gives me a cup of coffee through [websms.by](http://websms.by/) referral programm. If you don't want use my devKey for any reason (extra parameter on requests at least), just pass the `devKey` parameter as `false`.
```
const Account = new Account({ user: 'test', apiKey: 'test', devKey: false);
```
PS: PRs are welcome! =)