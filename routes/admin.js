const { contest } = require('../models');
const { question } = require('../models');
const to = require('../utils/to');

module.exports = ()=>{
  let exp = {};
  exp.showcontests = async (req, res) =>{
    let err,contests;
    [err, contests] = await to(contest.findAll());
    if (err) {
      console.log(err);
      return res.sendError(err);
    }
    return res.sendSuccess(contests,'Successfully displaying contests');
  };

  exp.showcontestbyid = async (req, res) =>{
    let err,contestobj;
    [err, contestobj] = await to(
      contest.findOne({
        where: { id: req.params.id }
      })
    );
    if (err) {
      console.log(err);
      return res.sendError(err);
    }
    return res.sendSuccess(contestobj,'Successfully displaying contest');
  };

  exp.addcontest = async (req, res) =>{
    let contestobj,err;
    if(req.user.access!=30) return res.sendError(null,'Access denied for user');
    [err, contestobj] = await to(contest.create({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      description: req.body.description,
      visibility: req.body.visibility,
      slug: req.body.slug
    }));	    
    if (err) {
      console.log(err);
      return res.sendError(err);
    }
	  return res.sendSuccess(null,'Contest added successfully');
  };
//need findOne before updating or deleting?
  exp.updatecontest = async (req, res) =>{
    let err,contestobj;
    if(req.user.access!=30) return res.sendError(null,'Access denied for user');
    [err, contestobj] = await to(
      contest.findOne({
        where: { id: req.body.id }
      })
    );
    if (err) {
      console.log(err);
      return res.sendError(err);
    }
    [err, contestobj] = await to(contest.update({
      id: req.body.id,
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      description: req.body.description,
      visibility: req.body.visibility,
      slug: req.body.slug
    }, {
      where: { id: req.body.id }
    }));
    if(err) return res.sendError(err);
    return res.sendSuccess(null,'Successfully updated contest');
  };

  exp.deletecontest = async (req, res) =>{
    let err,contestobj;
    if(req.user.access!=30) return res.sendError(null,'Access denied for user');
    [err, contestobj] = await to(
      contest.findOne({
        where: { id: req.params.id }
      })
    );
    if (err) {
      console.log(err);
      return res.sendError(err);
    }
    [err, contestobj] = await to(contest.destroy({
      where: { id: req.params.id }
    }));
    if(err) return res.sendError(err);
    return res.sendSuccess(null,'Successfully deleted contest');
  };

  exp.showquestions = async (req, res) => {
    let err, questions;
    [err, questions] = await to(question.findAll());
    if(err) {
      console.log(err);
      res.sendError(err);
    }
    return res.sendSuccess(questions, 'Successfully displaying questions');
  };

  exp.showquestionbyid = async (req, res) => {
    let err, newquestion;
    [err, newquestion] = await to(question.findOne({
      where : { id: req.params.id}
    }));
    if(err) {
      console.log(err);
      res.sendError(err);
    }
    return res.sendSuccess(newquestion, 'Successfully displaying question');
  };

  exp.showquestionsadmin = async (req, res) => {
    let err, questions;
    if(req.user.access < 20) res.sendError(null, 'Access denied');
    [err, questions] = await to(question.findAll());
    if(err) {
      console.log(err);
      res.sendError(err);
    }
    return res.sendSuccess(questions, 'Successfully displaying questions');
  };

  exp.showquestionbyidadmin = async (req, res) => {
    let err, newquestion;
    if(req.user.access < 20) res.sendError(null, 'Access denied');
    [err, newquestion] = await to(question.findOne({
      where : { id: req.params.id}
    }));
    if(err) {
      console.log(err);
      res.sendError(err);
    }
    return res.sendSuccess(newquestion, 'Successfully displaying questions');
  };

  exp.addquestion = async (req, res) => {
    let err, newquestion;
    if(req.user.access < 20) res.sendError(null, 'Access denied');
    [err, newquestion] = await to(question.create({
      id: req.body.id,
      body: req.body.body,
      title: req.body.title,
      input_format: req.body.input_format,
      constraints: req.body.constraints,
      output_format: req.body.output_format,
      author: req.body.author,
      level: req.body.level,
      contest: req.body.contest,
      score: req.body.score,
      checker_path: req.body.checker_path,
      checker_language: req.body.checker_language,
      time_limit: req.body.time_limit,
      slug: req.body.slug,
      editorial: req.body.editorial,
      is_practice: req.body.is_practice
    }));
    if(err) {
      console.log(err);
      res.sendError(err);
    }
    return res.sendSuccess(newquestion, 'Successfully added question');
  };

  exp.updatequestion = async (req, res) => {
    let err, newquestion;
    if(req.user.access < 20) res.sendError(null, 'Access denied');
    [err, newquestion] = await to(question.update({
      id: req.body.id,
      body: req.body.body,
      title: req.body.title,
      input_format: req.body.input_format,
      constraints: req.body.constraints,
      output_format: req.body.output_format,
      author: req.body.author,
      level: req.body.level,
      contest: req.body.contest,
      score: req.body.score,
      checker_path: req.body.checker_path,
      checker_language: req.body.checker_language,
      time_limit: req.body.time_limit,
      slug: req.body.slug,
      editorial: req.body.editorial,
      is_practice: req.body.is_practice
    }, {
        where : {id: req.body.id}
    }));
    if(err) {
      console.log(err);
      res.sendError(err);
    }
    return res.sendSuccess(newquestion, 'Successfully updated question');
  };

  exp.deletequestion = async (req, res) => {
    let err, newquestion;
    if(req.user.access < 20) res.sendError(null, 'Access denied');
    [err, newquestion] = await to(question.destroy({
      where: {id: req.params.id}
    }));
    if(err) {
      console.log(err);
      res.sendError(err);
    }
    return res.sendSuccess(newquestion, 'Successfully deleted question');
  };

  return exp;
}