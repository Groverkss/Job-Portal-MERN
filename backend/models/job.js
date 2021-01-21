const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const jobSchema = new mongoose.Schema({
});

jobSchema.plugin(uniqueValidator);

const Job = mongoose.model('User', jobSchema);

module.exports = Job
