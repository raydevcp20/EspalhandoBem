const jwt = require('jsonwebtoken');
const { type } = require('os');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'] || [];
  
  if (!authHeader) {
    return res.status(401).json({ status: "ERROR",  result: 'Acesso negado! Token não fornecido.' });
  }

  // const token = authHeader.split(' ')[1];
  // let decodedToken;
  try {
    const payload = jwt.verify(token, 'secretfortoken');
    const userFromToken = typeof payload === 'string' && payload.user;

    if (!userFromToken) {
      return res.status(403).json({ status: "ERROR",  result: 'Acesso negado! Token Inválido.' });
    }
    // req.headers['user'] = payload.user;
    req.isLoggedIn = true;
    req.userId = payload.user.id;
    req.email = payload.user.email;

    return next();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return res.status(500);
  }
  // if (!decodedToken) {
  //   const error = new Error('Not authenticated!');
  //   error.statusCode = 401;
  //   throw error;
  // }
  // req.isLoggedIn = true;
  // req.userId = decodedToken.userId;
  // req.email = decodedToken.email;
  // next();
};