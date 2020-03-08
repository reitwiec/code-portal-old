const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  client: client,
  ttl: 604800
};

module.exports = session => {
  const redisStore = require('connect-redis')(session);
  return new redisStore(redisConfig);
};
