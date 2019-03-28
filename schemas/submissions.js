const Joi = require('joi');

exports.submit = Joi.object({
  body: Joi.object({
      source: Joi.string().
      required(),
      language: Joi.number()
        .integer()
        .positive()
        .required(),
      question: Joi.number()
        .integer()
        .positive()
        .required()
    })
    .required()
});

exports.details = Joi.object({
  query: Joi.object({
    id: Joi.number()
      .integer()
      .positive()
      .required()
  })
  .required()
});
