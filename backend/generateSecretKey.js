const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config();

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Write the secret key to the .env file
fs.writeFileSync('.env', `JWT_SECRET=${secretKey}\n`);

console.log('Secret key generated and saved to .env file.');
