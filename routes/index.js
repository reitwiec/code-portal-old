const express = require('express');
const router = express.Router();

const validator = require('../utils/validator');
const schemas = require('../schemas');

const fileUpload = require('express-fileupload');

const access = level => (req, res, next) => {
  if (req.user && req.user.access >= level) return next();
  return res.sendError(null, 'Unauthorized access');
};

module.exports = passport => {
  const auth = require('./auth')(passport);
  const admin = require('./admin')(passport);
  const leaderboard = require('./leaderboard')(passport);
  const subLimit = require('./subLimit')(passport);

  //auth routes
  router.post('/register', validator(schemas.auth.register), auth.register);
  router.post('/login', validator(schemas.auth.login), auth.login);

  //admin routes
  router.get('/showcontests', admin.showcontests);

  router.get('/showcontests/:id', admin.showcontestbyid);

  router.post(
    '/addcontest',
    access(30),
    validator(schemas.admin.addcontest),
    admin.addcontest
  );

  router.post(
    '/updatecontest',
    access(30),
    validator(schemas.admin.updatecontest),
    admin.updatecontest
  );

  router.delete('/deletecontest/:id', access(30), admin.deletecontest);

  router.get('/showquestions', access(20), admin.showquestions);

  router.get('/showquestions/:id', access(20), admin.showquestionbyid);

  router.get(
    '/showquestionsbycontest/:contest',
    access(30),
    admin.showquestionsbycontest
  );

  router.get('/showquestionsadmin', access(20), admin.showquestionsadmin);

  router.get(
    '/showquestionsadmin/:id',
    access(20),
    admin.showquestionbyidadmin
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

  router.delete('/deletequestion/:id', access(20), admin.deletequestion);

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
      limits: { fileSize: 10 * 1024 * 1024 },
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

  return router;
};
