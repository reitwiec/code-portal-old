const Joi = require('joi');

const register = Joi.object({
  body: Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required().trim(),
    password: Joi.string()
      .min(8)
      .max(30)
      .required().trim(),
    password_confirmation: Joi.string()
      .min(8)
      .max(30)
      .required().trim(),
    email: Joi.string()
      .email()
      .max(100)
      .required().trim(),
    organisation: Joi.string()
      .max(100)
      .required().trim(),
    regno: Joi.string()
      .allow('')
      .max(20).trim(),
    username: Joi.string()
      .max(50)
      .required().trim(),
    phone: Joi.string()
      .allow('')
      .max(20).trim(),
    'g-recaptcha-response': Joi.string().required()
  }).required()
});

const login = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email()
      .required().trim(),
    password: Joi.string().required().trim()
  }).required()
});

const forgotpass = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email()
      .required().trim(),
    'g-recaptcha-response': Joi.string().required()
  }).required()
});

const resetpass = Joi.object({
  body: Joi.object({
    token: Joi.string().required(),
    newpass: Joi.string().required().trim()
  }).required()
});

module.exports = {
  register,
  login,
  forgotpass,
  resetpass
};
