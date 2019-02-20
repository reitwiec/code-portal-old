const { user } = require('../models');
const to = require('../utils/to');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

module.exports = passport => {
  let exp = {};
  exp.register = async (req, res) => {
    let err, myUser, salt, hash, newUser;
    [err, myUser] = await to(
      user.findOne({
        where: Sequelize.or(
          { email: req.body.email },
          { uname: req.body.uname }
        )
      })
    );
    if (err) return res.sendError(err);
    if (myUser && myUser.email === req.body.email)
      return res.sendError(null, 'A user with this email already exists', 409);
    if (myUser && myUser.uname === req.body.uname)
      return res.sendError(null, 'This username is already taken', 409);
    if (req.body.password !== req.body.confirm_pass)
      return res.sendError(null, 'Passwords do not match', 409);
    //Salting and hashing
    [err, salt] = await to(bcrypt.genSalt(10));
    if (err) return res.sendError(err);
    [err, hash] = await to(bcrypt.hash(req.body.password, salt));
    if (err) return res.sendError(err);
    const { confirm_pass, ...userData } = req.body;
    [err, newUser] = await to(
      user.create({
        ...userData,
        password: hash
      })
    );
    if (err) return res.sendError(err);
    return res.sendSuccess(null, 'User registered successfully');
  };

  exp.login = async (req, res) => {
    let err, userData, result;
    [err, userData] = await to(
      user.findOne({
        where: { email: req.body.email }
      })
    );
    if (err) return res.sendError(err);
    if (!userData)
      return res.sendError(null, 'Invalid email/password combination', 401);
    [err, result] = await to(
      bcrypt.compare(req.body.password, userData.password)
    );
    if (err) return res.sendError(err);
    if (!result)
      return res.sendError(null, 'Invalid email/password combination', 401);
    //passport doesn't support promises :(
    req.login(userData, err => {
      if (err) return res.sendError(err);
      return res.sendSuccess(null, 'Login successful');
    });
  };

  return exp;
};
