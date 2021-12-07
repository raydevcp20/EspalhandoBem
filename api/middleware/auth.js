const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // console.log(req.headers.authorization);
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  if (!authHeader) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secretfortoken');
    console.log(req)
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }
  req.isLoggedIn = true;
  req.userId = decodedToken.userId;
  req.email = decodedToken.email;
  next();
};