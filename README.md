# Description
![CI](https://github.com/bonnzer/websmsby/workflows/CI/badge.svg?branch=develop) [![codecov](https://codecov.io/gh/bonnzer/websmsby/branch/master/graph/badge.svg?token=23RFI5WEFU)](https://codecov.io/gh/bonnzer/websmsby)


No dependencies Node.js module for [websms.by](http://websms.by/) service.
Currently supports only two main segments of functionality:

  - work with [account's data](https://bonnzer.github.io/websmsby/classes/_classes_account_.account.html#activatepaycard)
  - sending [SMS functions](https://bonnzer.github.io/websmsby/classes/_classes_sms_.sms.html#getbulkcost)

# Installation
```sh
$ yarn add websmsby
```

# Usage and parameters
This module has a bunch of `*.d.ts` files so you can use this lib with pleasure and Typescript :)
Every request returns Promise, so it shouldn't be a problem to use methods in classic way or with async/await.
Just a simple example with Account, cause all needed docs you can find below:
```
import { Account } from 'websmsby';

// user and apiKey params are mandatory, testMode and devKey aren't.
const account = new Account({ user: 'yourmail@here.com', apiKey: 'somekey' });

account.getBalance().then().catch((e)..
```

...or with SMS

```
import { SMS } from 'websmsby';

const gateway = new SMS({ user: 'yourmail@here.com', apiKey: 'somekey', testMode: true });
gateway.sendSMS({ recipients: ['375291111111'], message: 'hello, world!', sender: 'myname'});
```
#### Account
- [getBalance()](https://bonnzer.github.io/websmsby/classes/_classes_account_.account.html#getbalance)
- [getUserNames()](https://bonnzer.github.io/websmsby/classes/_classes_account_.account.html#getusernames)
- [getViberNames()](https://bonnzer.github.io/websmsby/classes/_classes_account_.account.html#getvibernames)
- [activatePayCard()](https://bonnzer.github.io/websmsby/classes/_classes_account_.account.html#activatepaycard)

#### SMS
- [sendSMS()](https://bonnzer.github.io/websmsby/classes/_classes_sms_.sms.html#sendsms)
- [sendBulkSMS()](https://bonnzer.github.io/websmsby/classes/_classes_sms_.sms.html#sendbulksms)
- [getCost()](https://bonnzer.github.io/websmsby/classes/_classes_sms_.sms.html#getcost)
- [getBulkCost()](https://bonnzer.github.io/websmsby/classes/_classes_sms_.sms.html#getbulkcost)
- [getStatus()](https://bonnzer.github.io/websmsby/classes/_classes_sms_.sms.html#getstatus)
- [getList()](https://bonnzer.github.io/websmsby/classes/_classes_sms_.sms.html#getlist)

# Contributing
This module is totally not ideal, so each PR will be reviewed with love and appreciate :)
