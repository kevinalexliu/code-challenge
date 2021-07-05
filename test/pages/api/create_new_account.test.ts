import { expect } from '@jest/globals';
import createNewAccount from 'src/pages/api/create_new_account';
import { mockRequest } from 'test/utils';

describe('/api/create_new_account', () => {
  test('returns true', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {},
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: true,
    });
  });

  test('return invalid username', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '',
        password: 'password'
      }
    })
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {username: 'Username is not valid'}
    });
  });

  test('return invalid password', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'username',
        password: ''
      }
    })
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {password: 'Password is not valid'}
    })
  })
});
