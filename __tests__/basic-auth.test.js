'use strict';

require('dotenv').config();
const base64 = require('base-64');

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server');
const request = supergoose(server);
const basic = require('../src/auth/middleware/basic');
const { response } = require('express');

describe('basic auth', () => {
  it('POST to /signup to create a new user', async () => {
    //arrange
    const obj = {
      username: 'ibrahim',
      password: '12345',
    };
    //act
    const response = await request.post('/signup').send(obj);
    //assert
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('ibrahim');
  });
  it('POST to /signin to login as a user (use basic auth)', async () => {
    //arrange
    let user = base64.encode('ibrahim:12345');
    let response = await request
      .post('/signin')
      .set(`Authorization`, `Basic ${user}`);

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('ibrahim');
  });
  describe('Need tests for auth middleware and the routes', () => {
    it('Does the middleware function (send it a basic header)', async () => {
      let user = base64.encode('ibrahim:12345');
      let response = await request
        .post('/signin')
        .set(`Authorization`, `Basic ${user}`);

      expect(response.status).toEqual(200);
      expect(response.body).toBeTruthy();
    });
    it('Do the routes assert the requirements (signup/signin)', async () => {
      const response = await request.post('/');
      expect(response.status).toBe(404);
    });
  });
  describe('internal server error test', () => {
    it('should return 500 when there is a server error', async () => {
      let response = await request.get('/bad');
      expect(response.status).toBe(500);
    });
  });
});
