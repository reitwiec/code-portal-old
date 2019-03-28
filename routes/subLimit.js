const client = require('../utils/cache');

module.exports = async (req, res, next) => {
  client.exists(req.user.id, (err, reply, next) => {
    if (err) {
      return res.sendError(err);
    }
    if (reply == 0) {
      client.set(req.user.id, 1);
      client.expire(req.user.id, 60);
      return next();
    } else {
      return res.sendError(null, 'Please wait for a minute before submitting again');
    }
  });
};