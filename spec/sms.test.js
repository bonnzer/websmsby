const chai = require('chai');
const { SMS } = require('../index');

const { expect } = chai;
const sms = new SMS({ user: 'fake', apiKey: 'fake', testMode: true });

describe('SMS', () => {
  it('should return Error without credentials', (done) => {
    try {
      const s = new SMS();
    } catch (e) {
      expect(e).to.be.an.instanceof(Error);
      expect(e.message).to.equal('Username and apikey required');
      done();
    }
  });

  describe('sendSMS', () => {
    it('should return Error without params', (done) => {
      try {
        sms
          .sendSMS({});
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: recipients is required. Message is required. Sender is required.');
        done();
      }
    });
    it('should return Error with incorrect sender name', (done) => {
      try {
        sms
          .sendSMS({ sender: 'veryveryveryverylongname', recipients: ['test'], message: 'test' });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: sender must have a length between 1 and 11.');
        done();
      }
    });
    it('should return Error with incorrect customId', (done) => {
      try {
        sms
          .sendSMS({
            sender: 'justname', recipients: ['test'], message: 'test', customId: 5,
          });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: CustomId should be equal to recipients.length');
        done();
      }
    });
  });

  describe('sendBulkSMS', () => {
    it('should return Error without params', (done) => {
      try {
        sms
          .sendBulkSMS({ });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: messages is required.');
        done();
      }
    });
    it('should return Error with incorrect recipient and message element', (done) => {
      try {
        sms
          .sendBulkSMS({ messages: [{ sender: 'justname' }] });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: messages.0.message is required. Messages.0.recipient is required.');
        done();
      }
    });
    it('should return Error with incorrect sender name', (done) => {
      try {
        sms
          .sendBulkSMS({ messages: [{ recipient: '123', message: 'test', sender: 'veryveryveryverylongname' }] });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: messages.0.sender must have a length between 1 and 11.');
        done();
      }
    });
  });

  describe('getCost', () => {
    it('should return Error without params', (done) => {
      try {
        sms
          .getCost({});
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: recipients is required. Message is required.');
        done();
      }
    });
  });

  describe('getBulkCost', () => {
    it('should return Error without params', (done) => {
      try {
        sms
          .getBulkCost({ });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: messages is required.');
        done();
      }
    });
    it('should return Error with incorrect recipient and message element', (done) => {
      try {
        sms
          .getBulkCost({ messages: [{ sender: 'justname' }] });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: messages.0.message is required. Messages.0.recipient is required.');
        done();
      }
    });
    it('should return Error with incorrect sender name', (done) => {
      try {
        sms
          .getBulkCost({ messages: [{ recipient: '123', message: 'test', sender: 'veryveryveryverylongname' }] });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: messages.0.sender must have a length between 1 and 11.');
        done();
      }
    });
  });

  describe('getStatus', () => {
    it('should return Error without message Ids', (done) => {
      try {
        sms
          .getStatus({ });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: messagesIds is required.');
        done();
      }
    });
    it('should return Error with too big array of message Ids', (done) => {
      try {
        sms
          .getStatus({ messagesIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: messagesIds must have a length between 1 and 10.');
        done();
      }
    });
  });
});
