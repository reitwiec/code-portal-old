const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

client.on('error', err => {
  console.log(`Error: ${err}`);
});

module.exports = client;
