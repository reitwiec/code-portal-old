const { user } = require('../models');
const to = require('../utils/to');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const crypto = require('crypto');

module.exports = passport => {
  let exp = {};

  exp.userData = async (req, res) =>
    res.sendSuccess({
      loggedIn: !!req.user
    });

  exp.register = async (req, res) => {
    let err, myUser, salt, hash, newUser;
    [err, myUser] = await to(
      user.findOne({
        where: Sequelize.or(
          { email: req.body.email },
          { username: req.body.username }
        )
      })
    );
    if (err) return res.sendError(err);
    if (myUser && myUser.email === req.body.email)
      return res.sendError(null, 'A user with this email already exists', 409);
    if (myUser && myUser.username === req.body.username)
      return res.sendError(null, 'This username is already taken', 409);
    if (req.body.password !== req.body.password_confirmation)
      return res.sendError(null, 'Passwords do not match', 409);
    //Salting and hashing
    [err, salt] = await to(bcrypt.genSalt(10));
    if (err) return res.sendError(err);
    [err, hash] = await to(bcrypt.hash(req.body.password, salt));
    if (err) return res.sendError(err);
    const { password_confirmation, ...userData } = req.body;
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

  exp.logout = async (req, res) => {
    req.session.destroy(err => {
      if (err) return res.sendError(err);
      req.logout();
      res.sendSuccess();
    });
  };

  exp.forgotpassword = async (req, res) => {
    let tkn;
    crypto.randomBytes(48, (err, buffer) => {
      if (err) return res.sendError(err);
      tkn = buffer.toString('code mara');
    });
    let [err, emailobj] = await to(
      user.findOne({
        where: {
          email: req.body.email
        }
      })
    );
    if (err) return res.sendError(err);
    if (!emailobj) return res.sendError('Email id not found');
    let tokenobj;
    [err, tokenobj] = await to(
      user.update(
        { token: tkn },
        {
          where: {
            email: emailobj
          }
        }
      )
    );
    if (err) return res.sendError(err);
  };

  return exp;
};
