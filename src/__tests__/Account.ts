import http from 'http';
import { Account } from '../index';
import { BALANCE_TYPES } from '../constants/Request';

jest.mock('http');

describe('Account', () => {
  describe('Params & body presence', () => {
    describe.each([
      [true, ''],
      [false, 'hey'],
    ])(
      `With testMode=%p and devKey=%p`,
      (testMode: boolean, devKey: string) => {
        const instance = new Account({
          user: 'test',
          apiKey: 'test',
          devKey,
          testMode,
        });

        const testMe = (method: () => void) => async () => {
          try {
            await method();
          } catch (e) {
            expect(e).toBe('test');
          }

          expect(http.request).toHaveBeenCalled();
        };

        test('getBalance()', testMe(instance.getBalance.bind(instance)));
        test('getUserNames()', testMe(instance.getUserNames.bind(instance)));
        test('getViberNames()', testMe(instance.getViberNames.bind(instance)));
        test(
          'activatePayCard()',
          testMe(
            instance.activatePayCard.bind(instance, {
              cardNo: 'testcard',
              balanceType: BALANCE_TYPES.SMS,
            }),
          ),
        );
      },
    );
  });
});
