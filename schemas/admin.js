const Joi = require('joi');

const addcontest = Joi.object({
  body: Joi.object({
    title: Joi.string()
      .max(256)
      .min(5)
      .required(),
    start: Joi.date()
      .iso()
      .required(),
    end: Joi.date()
      .iso()
      .required(),
    description: Joi.string(),
    visibility: Joi.string()
      .required(),
    slug: Joi.string()
      .required()
  })
});

contest updatecontest = Joi.object({
  body: Joi.object({
    title: Joi.string()
      .max(256)
      .min(5),
    start: Joi.date()
      .iso(),
    end: Joi.date()
      .iso(),
    description: Joi.string(),
    visibility: Joi.string(),
    slug: Joi.string()
  })
});

module.exports = {
  addcontest,
  updatecontest
};