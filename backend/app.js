const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const { authCheck, unkownEndpoint } = require('./utils/middleware')

const userRouter = require('./controllers/users')

app.use(morgan('dev'))
app.use(cors());
app.use(express.json())

app.use('/api/users', userRouter);

/* Require auth for further routes */
app.use(authCheck)

app.get('/', (req, res) => {
  res.json({
    "content": "Hello World"
  });
  res.sendStatus(200).end();
});

app.use(unkownEndpoint);

module.exports = app
