const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  firstName: String,
  lastName: String,
  passwordHash: String,
  type: Number,
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User
