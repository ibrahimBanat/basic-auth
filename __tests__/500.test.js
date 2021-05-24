'use strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server');
const request = supergoose(server);

describe('internal server error test', () => {
  it('should return 500 when there is a server error', async () => {
    let response = await request.get('/bad');
    expect(response.status).toBe(500);
  });
});
