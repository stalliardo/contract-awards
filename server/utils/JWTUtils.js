
const jwt = require('jsonwebtoken');

function generateJWT(username) {
  const secretKey = process.env.JWT_SECRET_KEY;

  console.log('secrt key  = ', secretKey);

  const token = jwt.sign({ username }, secretKey, { expiresIn: '14d' });

  console.log('token = ', token);
  return token;

}

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization || req.params.token;
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    // Attach the decoded payload to the request object

    // Check if the token has expired
    const currentTimestamp = Math.floor(Date.now() / 1000); // Get current time in seconds
    if (decoded.exp <= currentTimestamp) {
      return res.status(401).json({ message: 'Token has expired.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
}

module.exports = { generateJWT, verifyToken }