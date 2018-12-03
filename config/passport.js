const { user } = require('../models');

module.exports = (passport) => {
  passport.serializeUser((User,done) => {
    return done(null,User.id);
  });

  passport.deserializeUser((uid,done) => {
    user.findByPk(uid,(err, myUser)=>{
      console.log(myUser);
      return done(err,myUser);
    });
  });
}