const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(morgan('dev'))
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send("Hello World");
});

module.exports = app
