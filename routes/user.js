const { user } = require('../models');
const to = require('../utils/to');

module.exports = passport => {
  let exp = {};

  exp.profile = async (req, res) => {
    const [err, userObj] = await to(
      user.findOne({
        where: {
          username: req.params.username
        }
      })
    );
    if (err) return res.sendError(err);
    if (!userObj) return res.sendError(null, 'User not found', 404);
    res.sendSuccess({
      name: userObj.name,
      username: userObj.username,
      organisation: userObj.organisation,
      rating: userObj.rating,
      ...(userObj.id === req.user.id && {
        phone: userObj.phone,
        regno: userObj.regno,
        email: userObj.email
      })
    });
  };

  return exp;
};
