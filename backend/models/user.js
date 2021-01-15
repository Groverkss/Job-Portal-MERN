const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  passwordHash: String
});

const User = mongoose.model('User', userSchema);

module.exports = User
