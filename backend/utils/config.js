require('dotenv').config()

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

module.exports = {
  PORT,
  URI
}
