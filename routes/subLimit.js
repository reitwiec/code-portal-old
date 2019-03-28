const client = require('../utils/cache');

module.exports = async (req, res, next) => {
  client.exists(`sub_limit_${req.user.id}`, (err, reply) => {
    if (err) {
      return res.sendError(err);
    }
    if (reply == 0) {
      client.set(`sub_limit_${req.user.id}`, 1);
      client.expire(`sub_limit${req.user.id}`, 10);
      return next();
    } else {
      return res.sendError(
        null,
        'Please wait for a minute before submitting again'
      );
    }
  });
};
