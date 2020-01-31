const Users = require('../users/users-model');
const db = require('../database/dbConfig');

describe('users model', function () {

   beforeEach(async () => {
      await db('users').truncate();
   });

   describe('addUser() method', function () {
      it('should add the user to the db', async function () {
         // call insert, passing it a hobbit object
         await Users.addUser({ username: "fred", password: "test" });
         await Users.addUser({ username: "jon", password: "test2" });

         // check the db directly to see if user got inserted
         const users = await db('users');
         expect(users).toHaveLength(2);

      })
   });
    it.skip('should log in user, allow access to jokes after log in', async () => {
             return await request(server)
                .post('/api/auth/login')
                .send({ username: 'john', password: 'test' })
                .then(res => {
                   const token = res.body.token;

                   return request(server)
                      .get('/api/jokes')
                      .set("Authorization", token)
                      .then(res => {
                         expect(res.status).toBe(200);
                         expect(Array.isArray(res.body)).toBe(true);
                      });
                });
          });
});

