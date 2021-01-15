const supertest = require('supertest')
const app = require('../app')
const { User, closeCon } = require('../mongo')
const mongoose = require('mongoose')

const api = supertest(app);

beforeEach(async () => {
});

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
      email: "groverkss@gmail.com",
      firstName: "Kunwar",
      lastName: "Grover",
      password: "Sekret"
    };

    await api
      .post('/api/users/register')
      .send(newUser)
      .expect(201);
  })

  test('Login using an invalid user', async () => {
    const loginUser = {
      email: "grover@gmail.com",
      password: "huhuhuh"
    };

    const res = await api
      .post('/api/users/login')
      .send(loginUser)
      .expect(401);

    await expect(res.body.error).toBeTruthy();
  });

  test('Login using a valid user', async () => {
    const loginUser = {
      email: "groverkss@gmail.com",
      password: "Sekret"
    };

    const res = await api
      .post('/api/users/login')
      .send(loginUser)
      .expect(200);

    await expect(res.body.email).toBe("groverkss@gmail.com");
    authToken = res.body.token;
  });

  test('Test connection with auth', async () => { 
    const res = await api
      .get('/')
      .set('Authorization', 'Bearer ' + authToken)
      .expect(200);
    
    await expect(res.body.content).toBe("Hello World");
  });

  test('Test connection with invalid auth', async () => {
    const res = await api
      .get('/')
      .set('Authorization', 'Bearer ' + 'invalidtoken')
      .expect(401);
    
    await expect(res.body.error).toBeTruthy();
  })

  test('Test invalid endpoint with auth', async () => {
    const res = await api
      .get('/invalidEndpoint')
      .set('Authorization', 'Bearer ' + authToken)
      .expect(404);
    
    await expect(res.body.error).toBeTruthy();
  })
});

afterAll( async () => {
  /* To avoid jest open handle error */
  await new Promise(resolve => setTimeout(() => resolve(), 1000)); 
});
