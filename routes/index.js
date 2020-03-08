const express = require('express');
const router = express.Router();

const validator = require('../utils/validator');
const schemas = require('../schemas');

const fileUpload = require('express-fileupload');

const access = level => (req, res, next) => {
  if (req.user && req.user.access >= level) return next();
  return res.sendError(null, 'Unauthorized access');
};

module.exports = (passport, io) => {
  const auth = require('./auth')(passport);
  const admin = require('./admin')(passport);
  const leaderboard = require('./leaderboard')(passport);
  const submissions = require('./submissions')(io);
  const subLimit = require('./subLimit');
  const captcha = require('../utils/captcha');
  const user = require('./user')(passport);

  //auth routes
  router.post(
    '/register',
    validator(schemas.auth.register),
    captcha,
    auth.register
  );
  router.post('/login', validator(schemas.auth.login), auth.login);
  router.get('/logout', auth.logout);
  router.get('/userdata', auth.userData);
  router.post(
    '/forgotpass',
    validator(schemas.auth.forgotpass),
    captcha,
    auth.forgotpassword
  );
  router.post(
    '/resetpass',
    validator(schemas.auth.resetpass),
    auth.resetPassword
  );

  //admin routes
  router.get('/showcontests', admin.showcontests);

  router.get('/showcontest/:slug', access(10), admin.showcontestbyslug);

  router.post(
    '/addcontest',
    access(30),
    validator(schemas.admin.addcontest),
    admin.addcontest
  );

  router.put(
    '/updatecontest',
    access(30),
    validator(schemas.admin.updatecontest),
    admin.updatecontest
  );

  router.delete('/deletecontest/:slug', access(30), admin.deletecontest);

  router.get('/showquestions', admin.showquestions);

  router.get('/showquestions/:slug', access(10), admin.showquestionbyslug);

  /*router.get(
    '/showquestionsbycontest/:contest_id',
    access(30),
    admin.showquestionsbycontest
  );*/

  router.get('/showquestionsadmin', access(20), admin.showquestionsadmin);

  router.get(
    '/showquestionsadmin/:slug',
    access(20),
    admin.showquestionbyslugadmin
  );

  router.post(
    '/addquestion',
    access(20),
    validator(schemas.admin.addquestion),
    admin.addquestion
  );

  router.put(
    '/updatequestion',
    access(20),
    validator(schemas.admin.updatequestion),
    admin.updatequestion
  );

  router.delete('/deletequestion/:slug', access(20), admin.deletequestion);

  router.post(
    '/addmoderator',
    access(20),
    validator(schemas.admin.addmoderator),
    admin.addmoderator
  );

  router.delete('/deletemoderator/:id', access(20), admin.deletemoderator);

  router.post(
    '/addtestcase',
    access(20),
    fileUpload({
      limits: {
        fileSize: 10 * 1024 * 1024
      },
      safeFileNames: true,
      preserveExtension: true,
      createParentPath: true,
      abortOnLimit: true
    }),
    validator(schemas.admin.addtestcase),
    admin.addtestcase
  );

  router.delete('/deletetestcase/:id', access(20), admin.deletetestcase);
  //leaderboard routes
  router.get('/:contest/leaderboard', leaderboard.showleaderboard);

  router.post(
    '/submit',
    access(10),
    validator(schemas.submissions.submit),
    // subLimit,
    submissions.submit
  );
  router.get(
    '/submission',
    access(10),
    validator(schemas.submissions.details),
    submissions.get_submission
  );
  router.get(
    '/viewsubmissions/:question_slug',
    access(10),
    submissions.view_submissions
  );
  router.get('/profile/:username', access(10), user.profile);

  return router;
};
