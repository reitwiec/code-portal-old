const Joi = require('joi');

const newcontest = Joi.object({
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

module.exports = {
  newcontest
};