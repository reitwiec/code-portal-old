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
    id: Joi.integer()
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

const addquestion = Joi.object({
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
    author: Joi.string()
      .required(),
    level: Joi.string()
      .valid['easy', 'medium', 'hard']
      .required(),
    contest: Joi.integer()
      .required(),
    score: Joi.integer()
      .required(),
    checker_path: Joi.string()
      .required(),
    checker_language: Joi.integer()
      .required(),
    time_limit: Joi.number()
      .required(),
    slug: Joi.string()
      .max(50)
      .required(),
    editorial: Joi.integer()
      .optional(),
    is_practice: Joi.integer()
      .required()
  })
});

const updatequestion = Joi.object({
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
    author: Joi.string()
      .required(),
    level: Joi.string()
      .valid['easy', 'medium', 'hard']
      .required(),
    contest: Joi.integer()
      .required(),
    score: Joi.integer()
      .required(),
    checker_path: Joi.string()
      .required(),
    checker_language: Joi.integer()
      .required(),
    time_limit: Joi.number()
      .required(),
    slug: Joi.string()
      .max(50)
      .required(),
    editorial: Joi.integer()
      .optional(),
    is_practice: Joi.integer()
      .required()
  })
});

module.exports = {
  addcontest,
  updatecontest,
  addquestion,
  updatequestion
};