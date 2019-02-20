const Joi = require('joi');

const register = Joi.object({
  body: Joi.object({
    name: Joi.string()
      .max(50)
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
    confirm_pass: Joi.string()
      .min(8)
      .required(),
    email: Joi.string()
      .email()
      .max(100)
      .required(),
    organisation: Joi.string()
      .max(100)
      .required(),
    regno: Joi.string().max(20),
    uname: Joi.string().required(),
    phone: Joi.string().max(20)
  }).required()
});

const login = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }).required()
});

module.exports = {
  register,
  login
};
