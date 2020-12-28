const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token'); // this is the header key that we want to send the token in

  // check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied ' }); //unauthorized
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET); // decoding the token

    req.user = decoded.user; // we attached user with id to payload
    next(); // as in any middleware
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
