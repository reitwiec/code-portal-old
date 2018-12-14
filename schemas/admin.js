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

const updatecontest = Joi.object({
  body: Joi.object({
    id: Joi.number()
      .integer()
      .required(),
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

const addmoderator = Joi.object({
  body: Joi.object({
    user: Joi.number()
      .integer()
      .required(),
    question: Joi.number()
      .integer()
      .required()
  })
});


/*const addquestion = Joi.object({
  body: Joi.object({
    id: Joi.integer()
      .required(),
    title: Joi.string()
      .max(256)
      .min(5)
      .required(),
    body: Joi.string()
      .required(),
    input_format: Joi.string()
      .required(),
    constraints: Joi.string()
      .required(),
    output_format: Joi.string()
      .required(),
  })
})*/

module.exports = {
  addcontest,
  updatecontest,
  addmoderator
};