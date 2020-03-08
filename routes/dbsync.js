const {
    language,
    question,
    testcase
} = require('../models');
const path = require('path');

exports.getDbData = async (req, res) => {
    try {
        if( process.env.SYNC_TOKEN == req.query.synctoken ) return res.sendError(null, 'Invalid Sync Token');
        let languageData = await language.findAll();
        let questionData = await question.findAll();
        let testcaseData = await testcase.findAll();
        return res.sendSuccess({
            languageData,
            questionData,
            testcaseData
        });
    } catch (err) {
        return res.sendError(err);
    }
};

exports.getInputFile = async (req, res) => {
    try{
        if( process.env.SYNC_TOKEN == req.query.synctoken ) return res.sendError(null, 'Invalid Sync Token');
        return res.sendFile(path.resolve(`questions/${req.query.question_id}/input/${req.query.file_id}.txt`));
    }catch(err){
        return res.sendError(err);
    }
};

exports.getOutputFile = async (req, res) => {
    try{
        if( process.env.SYNC_TOKEN == req.query.synctoken ) return res.sendError(null, 'Invalid Sync Token');
        return res.sendFile(path.resolve(`questions/${req.query.question_id}/output/${req.query.file_id}.txt`));
    }catch(err){
        return res.sendError(err);
    }
};