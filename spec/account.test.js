const chai = require('chai');
const { Account } = require('../index');

const { expect } = chai;

describe('Account', () => {
  it('should return Error without credentials', (done) => {
    try {
      const account = new Account();
    } catch (e) {
      expect(e).to.be.an.instanceof(Error);
      expect(e.message).to.equal('Username and apikey required');
      done();
    }
  });
  describe('Activate prepaid card', () => {
    const account = new Account({ user: 'fake', apiKey: 'fake', testMode: true });

    it('should return Error without card number', (done) => {
      try {
        account
          .activatePayCard({ balanceType: 1 });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: cardNo is required.');
        done();
      }
    });
    it('should return Error without balance type', (done) => {
      try {
        account
          .activatePayCard({ cardNo: '1223' });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: balanceType is required.');
        done();
      }
    });
    it('should return Error with incorrect balance type', (done) => {
      try {
        account
          .activatePayCard({ cardNo: '1232', balanceType: 10 });
      } catch (e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.equal('Error: balanceType must be either 0 or 1.');
        done();
      }
    });
  });
});
