const Joi = require('joi');

const getDbData = Joi.object({
    query: Joi.object({
        synctoken: Joi.string().required()
    }).required()
});

const getInputOutputFile = Joi.object({
    query: Joi.object({
        synctoken: Joi.string().required(),
        question_id: Joi.number().integer().required(),
        file_id: Joi.number().integer().required()
    }).required()
});

module.exports = {
    getDbData,
    getInputOutputFile
};