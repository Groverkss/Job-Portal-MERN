const jwt = require('jsonwebtoken')
const config = require('./config')

const extractToken = req => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
}

const authCheck = (req, res, next) => {
  const token = extractToken(req);
  if (!token) {
    res.status(401).json({ error: "Token Missing or Invalid" });
  }
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken.id) {
    res.status(401).json({ error: "Token Missing or Invalid" });
  }
  req.authTokenId = decodedToken?.id;
  next();
}

const unkownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unkown endpoint' });
}

module.exports = {
  authCheck,
  unkownEndpoint,
}
