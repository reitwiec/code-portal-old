const express = require('express');
const router = express.Router();

const validator = require('../utils/validator');
const schemas = require('../schemas');

module.exports = (passport)=>{
  const auth = require('./auth')(passport);
  const admin = require('./admin')(passport);

  //auth routes
  router.post('/register',
  validator(schemas.auth.register),
  auth.register
  );
  router.post('/login',
  validator(schemas.auth.login),
  auth.login
  );

  //admin routes
  router.get('/showcontests',
    admin.showcontests);

  router.get('/showcontests/:id',
    admin.showcontestbyid);

  router.post('/addcontest',
    validator(schemas.admin.addcontest),
    admin.addcontest);

  router.put('/updatecontest',
    validator(schemas.admin.updatecontest),
    admin.updatecontest);

  router.delete('/deletecontest/:id',
    admin.deletecontest);

  router.get('/showquestions',
    admin.showquestions);

  router.get('/showquestions/:id',
    admin.showquestionbyid);

  router.get('/showquestionsbycontest/:contest',
    admin.showquestionsbycontest);

  router.get('/showquestionsadmin',
    admin.showquestionsadmin);

  router.get('/showquestionsadmin/:id',
    admin.showquestionbyidadmin);

  router.post('/addquestion',
    validator(schemas.admin.addquestion),
    admin.addquestion);
  
  router.put('/updatequestion',
    validator(schemas.admin.updatequestion),
    admin.updatequestion);

  router.delete('/deletequestion/:id',
    admin.deletequestion);

  router.post('/addmoderator',
    validator(schemas.admin.addmoderator),
    admin.addmoderator);

  router.delete('/deletemoderator/:id',
    admin.deletemoderator);

  router.post('/addtestcase',
    validator(schemas.admin.addtestcase),
    admin.addtestcase);

  router.delete('/deletetestcase/:id',
    admin.deletetestcase);

  return router;
}