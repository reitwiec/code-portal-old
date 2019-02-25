const Joi = require('joi');

const register = Joi.object({
  body: Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .required(),
    password_confirmation: Joi.string()
      .min(8)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .max(100)
      .required(),
    organisation: Joi.string()
      .max(100)
      .required(),
    regno: Joi.string()
      .allow('')
      .max(20),
    username: Joi.string()
      .max(50)
      .required(),
    phone: Joi.string()
      .allow('')
      .max(20)
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
