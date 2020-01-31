const request = require('supertest');
const server = require('./server.js');
const authenticate = require('../auth/authenticate-middleware.js');
const Users = require('../users/user-model.js');
const db = require('../database/dbConfig');

describe('server.js', () => {

   describe('the jokes route', () => {
      it('should return OK 401 status to the /api/jokes route when not logged in', async () => {
         const response = await request(server).get('/api/jokes');
         expect(response.status).toBe(401);
      })
   })
})
