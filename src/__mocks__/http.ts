import { METHODS } from '../constants/Request';

export default {
  request: jest.fn((args) => {
    expect(args).toMatchSnapshot();

    return {
      on: jest.fn((e, callback) => {
        callback('test');

        return {
          end: jest.fn(),
          write: jest.fn((body) => {
            if (e.method === METHODS.POST) {
              expect(body).toMatchSnapshot();
            }
          }),
        };
      }),
    };
  }),
};
