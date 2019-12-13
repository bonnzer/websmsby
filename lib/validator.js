const Schema = require('validate');

/*
 * Common schemas
 */
const clientValidator = new Schema({
  user: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
});

/*
 * Account schemas
 */
const accountValidator = new Schema({
  cardNo: {
    type: String,
    required: true,
  },
  balanceType: {
    type: Number,
    required: true,
    enum: [0, 1],
  },
});

/*
 * SMS schemas
 */
const recipient = new Schema({
  recipient: {
    type: String,
    required: true,
  },
});

const recipients = new Schema({
  recipients: {
    type: Array,
    required: true,
    length: { min: 1 },
    each: {
      type: String,
      required: true,
    },
  },
});

const message = new Schema({
  message: {
    type: String,
    required: true,
  },
});

const sender = new Schema({
  sender: {
    type: String,
    required: true,
    length: { min: 1, max: 11 },
  },
});

const messages = new Schema({
  messages: {
    type: Array,
    required: true,
    length: { min: 1, max: 500 },
    each: {
      properties: {
        message: {
          type: String,
          required: true,
        },
        sender: {
          type: String,
          length: { min: 1, max: 11 },
        },
        recipient: {
          type: String,
          required: true,
        },
      },
    },
  },
});

const messagesIds = new Schema({
  messagesIds: {
    type: Array,
    length: { min: 1, max: 10 },
    required: true,
    each: {
      type: Number,
      required: true,
    },
  },
});

const SMSValidators = {
  recipient,
  recipients,
  message,
  messages,
  sender,
  messagesIds,
};

module.exports.clientValidator = clientValidator;
module.exports.accountValidator = accountValidator;
module.exports.SMSValidators = SMSValidators;
