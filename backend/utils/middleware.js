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
    return res.status(401).json({ error: "Token Missing or Invalid" });
  }
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token Missing or Invalid" });
  }
  req.authTokenId = decodedToken.id;
  next();
}

const unkownEndpoint = (req, res) => {
  return res.status(404).send({ error: 'unkown endpoint' });
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CaseError') {
    return res.status(400).send({
      error: "Malformatted Id",
    });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message,
    });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid Token',
    });
  }

  logger.error(error.message);
}

module.exports = {
  authCheck,
  unkownEndpoint,
  errorHandler
}
