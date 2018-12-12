const express = require('express');
const router = express.Router();

const validator = require('../utils/validator');
const schemas = require('../schemas');

module.exports = (passport)=>{
  const auth = require('./auth')(passport);
  const admin = require('./admin');

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
  
  return router;
}