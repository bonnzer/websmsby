import http from 'http';
import { SMS } from '../index';

jest.mock('http');

describe('SMS', () => {
  describe('Params & body presence', () => {
    describe.each([
      [true, ''],
      [false, 'hey'],
    ])(
      `With testMode=%p and devKey=%p`,
      (testMode: boolean, devKey: string) => {
        const instance = new SMS({
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

        test(
          'sendSMS()',
          testMe(
            instance.sendSMS.bind(instance, {
              message: 'test',
              recipients: 'test',
              sender: 'me',
            }),
          ),
        );
        test(
          'sendBulkSMS()',
          testMe(
            instance.sendBulkSMS.bind(instance, [
              {
                message: 'test',
                recipients: 'test',
                sender: 'me',
              },
            ]),
          ),
        );
        test(
          'getStatus()',
          testMe(
            instance.getStatus.bind(instance, {
              messages_id: ['test', 'test1'],
            }),
          ),
        );
        test(
          'getList()',
          testMe(
            instance.getList.bind(instance, {
              messages_id: 'test',
              date_from: '2020-02-01',
              date_to: '2020-02-01',
            }),
          ),
        );
        test(
          'getCost()',
          testMe(
            instance.getCost.bind(instance, {
              recipients: ['test', 'test'],
              message: 'test',
            }),
          ),
        );
        test(
          'getBulkCost()',
          testMe(
            instance.getBulkCost.bind(instance, [
              {
                recipients: ['test', 'test'],
                message: 'test',
              },
            ]),
          ),
        );
      },
    );
  });
});
