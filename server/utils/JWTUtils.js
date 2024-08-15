
const jwt = require('jsonwebtoken');

function generateJWT(username) {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ username }, secretKey, { expiresIn: '14d' });
  return token;
}

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization || req.params.token;
  const secretKey = process.env.JWT_SECRET_KEY;
  
  console.log('verify token called +  token = ', token);
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Check if the token has expired
    const currentTimestamp = Math.floor(Date.now() / 1000); // Get current time in seconds
    if (decoded.exp <= currentTimestamp) {
      console.log('\nToken has EXPIRED');
      return res.status(401).json({ message: 'Token has expired.' });
    }

    console.log('decoded = ', decoded);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
}

function canUserPerformAuthenticatedAction(username) {
  switch(username.toLowerCase()) {
    case "darren.stallard@wingate.co.uk" : {      
      return true;
    }
    case "darren.stallard@dazcorp.com" : {
      return true;
    }
    default : {
      return false;
    }
  }
}

module.exports = { generateJWT, verifyToken, canUserPerformAuthenticatedAction }