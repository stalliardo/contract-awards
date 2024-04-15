
const jwt = require('jsonwebtoken');

function generateJWT(username) {
    const secretKey = process.env.JWT_SECRET_KEY;

    console.log('secrt key  = ', secretKey);

    const token = jwt.sign({ username }, secretKey, { expiresIn: '14d' });

    console.log('token = ', token);
    return token;

}

module.exports = { generateJWT }