const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;
console.log('Loaded JWT Secret Key:', secretKey); // Add this line for debugging

function generateToken(user) {
    return jwt.sign(user, secretKey, { expiresIn: '1h' });
}

module.exports = {
    generateToken
};
