const auth = require('./auth');
const admin = require('./admin');
const submissions = require('./submissions');
const dbsync = require('./dbsync');

module.exports = {
  auth,
  admin,
  submissions,
  dbsync
};
