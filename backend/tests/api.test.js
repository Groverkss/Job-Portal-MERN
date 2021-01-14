const supertest = require('supertest')
const app = require('../app')
const { User } = require('../mongo')
const mongoose = require('mongoose')

const api = supertest(app);

beforeEach(async () => {
})

describe('Registeration and Login Testing', () => {
  let authToken = ""

  test('Check connection without auth', async () => {
    /* Delete existing state of test db */
    await User.deleteMany({})

    const res = await api
      .get('/')
      .expect(401)
      .expect('Content-Type', /application\/json/);

    await expect(res.body.error).toBeTruthy()
  });

  test('Register a user', async () => {
    const newUser = {
      username: "root",
      firstName: "Kunwar",
      lastName: "Grover",
      password: "Skret"
    };

    await api
      .post('/api/users/register')
      .send(newUser)
      .expect(201);
  })

  test('Login using the user', async () => {
    const loginUser = {
      username: "root",
      password: "Skret"
    };

    const res = await api
      .post('/api/users/login')
      .send(loginUser)
      .expect(200);

    await expect(res.body.username).toBe("root");
    authToken = res.body.token;
  })

  test('Test connection with auth', async () => { 

    const res = await api
      .get('/')
      .set('Authorization', 'Bearer ' + authToken)
      .expect(200);
    
    await expect(res.body.content).toBe("Hello World");
  })
})

afterAll( () => {
  mongoose.disconnect();
})
