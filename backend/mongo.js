const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

mongoose.connect(config.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true })
  .then( result => {
    logger.info('Connected to MongoDB');
  } )
  .catch( error => {
    logger.error(error); 
  } )
