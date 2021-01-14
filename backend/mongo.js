const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

const User = require('./models/user')

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true })
  .then( result => {
    logger.info('Connected to MongoDB');
  } )
  .catch( error => {
    logger.error(error); 
  } );

module.exports = {
  User,
}
