const {
    language,
    question,
    testcase,
    contest
} = require('../models');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const base_dir = `/home/iecse/Code-Portal/`;

exports.getDbData = async (req, res) => {
    try {
        if( process.env.SYNC_TOKEN != req.query.synctoken ) return res.sendError(null, 'Invalid Sync Token');
        let languageData = await language.findAll();
        let questionData = await question.findAll();
        let testcaseData = await testcase.findAll();
        let contestData = await contest.findAll();
        return res.sendSuccess({
            languageData,
            questionData,
            testcaseData,
            contestData
        });
    } catch (err) {
        return res.sendError(err);
    }
};

exports.getInputFile = async (req, res) => {
    try{
        if( process.env.SYNC_TOKEN != req.query.synctoken ) return res.sendError(null, 'Invalid Sync Token');
        return res.sendFile( base_dir + `questions/${req.query.question_id}/input/${req.query.file_id}.txt` );
    }catch(err){
        return res.sendError(err);
    }
};

exports.getOutputFile = async (req, res) => {
    try{
        if( process.env.SYNC_TOKEN != req.query.synctoken ) return res.sendError(null, 'Invalid Sync Token');
        return res.sendFile( base_dir + `questions/${req.query.question_id}/output/${req.query.file_id}.txt` );
    }catch(err){
        return res.sendError(err);
    }
};
