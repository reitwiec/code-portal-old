const { user } = require('../models');
const to = require('../utils/to');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const crypto = require('crypto');
const axios = require('axios');

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
          {
            email: req.body.email
          },
          {
            username: req.body.username
          }
        )
      })
    );
    console.log( req.body.username );
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
    if (err) {
	if (err && err.original && err.original.code === 'ER_DUP_ENTRY') return res.sendError(null, 'This username is already taken', 409);
	else if(err && err.code && err.code ==='ER_DUP_ENTRY') return res.sendError(null, 'This username is already taken', 409);
	else return res.sendError(err);
    }
    else return res.sendSuccess(null, 'User registered successfully');
  };

  exp.login = async (req, res) => {
    let err, userData, result;
    [err, userData] = await to(
      user.findOne({
        where: {
          email: req.body.email
        }
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
    let tkn, emailobj;
    req.body.email = String( req.body.email ).trim();
    let [e1, usr] = await to(
      user.findOne({
        where: {
          email: req.body.email
        }
      })
    );
    if (e1) return res.sendError(e1);
    if (!usr) return res.sendError(null, 'Invalid Email');
    crypto.randomBytes(20, async (err, buffer) => {
      if (err) return res.sendError(err);
      tkn = buffer.toString('hex');
      let tokenobj;
      [err, tokenobj] = await to(
        user.update(
          {
            token: tkn
          },
          {
            where: {
              email: req.body.email
            }
          }
        )
      );
      if (err) return res.sendError(err);
      // TODO : Finish Mailer Call
      axios
        .post(
          'https://mail.iecsemanipal.com/codeportal/forgotpassword',
          {
            toEmail: req.body.email,
            name: usr.name,
            url: 'https://code.iecsemanipal.com/reset?token=' + tkn
          },
          {
            headers: {
              Authorization: 'thisisthecodeportalauthtoken'
            }
          }
        )
        .then(response => {})
        .catch(console.log);
      return res.sendSuccess(
        null,
        'Please check email for link to change your password'
      );
    });
  };

  exp.resetPassword = async (req, res) => {
    let err, salt, hash, result;
    [err, salt] = await to(bcrypt.genSalt(10));
    if (err) return res.sendError(err);
    [err, hash] = await to(bcrypt.hash(req.body.newpass, salt));
    if (err) return res.sendError(err);
    [err, result] = await to(
      user.update(
        {
          token: null,
          password: hash
        },
        {
          where: {
            token: req.body.token
          }
        }
      )
    );
    if (err) return res.sendError(err);
    if (result[0] == 0) return res.sendError(null, 'Link Invalid or Expired');
    return res.sendSuccess(null, 'Successfully changed password');
  };

  return exp;
};
