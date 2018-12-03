const LocalStrategy = require('passport-local').Strategy;

const { user } = require('../models');

module.exports = (passport) => {
  passport.serializeUser = (user,done) => {
    console.log('ayay');
    return done(null,user.id);
  }
  passport.deserializeUser = (uid,done) => {
    let [err, myUser] = user.findById(uid);
    return done(err,myUser);
  }

  passport.use('local-login',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },(req,email,password,done)=>{
    return done(null);
  }));
}