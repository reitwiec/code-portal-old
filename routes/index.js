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
  router.get('/contests',
    admin.showcontests);

  router.post('/contests',
    validator(schemas.admin.addcontest),
    admin.addcontest);
  
  return router;
}