const { contest } = require('../models');
const { question } = require('../models');
const { moderator } = require('../models');
const { testcase } = require('../models');
const to = require('../utils/to');
const fs = require('fs');
const Busboy = require('busboy');
const path = '../questions';
const Path = require("path");

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
    if(!contestobj) return res.sendError(null,'Contest doesnt exist');
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
    if(!contestobj) return res.sendError(null,'Doesnt exist');
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
    if(!contestobj) return res.sendError(null,'Doesnt exist');
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
      return res.sendError(err);
    }
    return res.sendSuccess(questions, 'Successfully displaying questions');
  };

  exp.showquestionbyid = async (req, res) => {
    let err, questionobj;
    [err, questionobj] = await to(question.findOne({
      where : { id: req.params.id}
    }));
    if(err) {
      return res.sendError(err);
    }
    if(!questionobj) return res.sendError(null,'Question doesnt exist');
    return res.sendSuccess(questionobj, 'Successfully displaying question');
  };

  exp.showquestionsbycontest = async (req, res) => {
    let err, questions;
    [err, questions] = await to(question.findAll({
      where : { contest: req.params.contest}
    }));
    if(err) {
      return res.sendError(err);
    }
    return res.sendSuccess(questions, 'Successfully displaying questions');
  };
  
  //have to use joins as shreyansh said
  exp.showquestionsadmin = async (req, res) => {
    let err, questions;
    if(req.user.access < 20) return res.sendError(null, 'Access denied');
    if(req.user.access==30) {
      [err, questions] = await to(question.findAll());
      if(err) {
        return res.sendError(err);
      }
      return res.sendSuccess(questions, 'Successfully displaying questions');
    }
    moderator.belongsToMany(question, { through: 'modquestion'});
    [err,questions] = await to(question.findAll({
      include: [{
        model: moderator,
        through: {
          where: ["question = id", user = req.user.id]
        }
      }]
    }));
    if(err) {
      return res.sendError(err);
    }
    return res.sendSuccess(questions, 'Successfully displaying questions');
  };

  exp.showquestionbyidadmin = async (req, res) => {
    let err, questionobj,modobj;
    [err, modobj] = await to(moderator.findOne({
      where : { 
        user: req.user.id,
        question: req.params.id
      }
    }));
    if(err) {
      return res.sendError(err);
    }
    if(req.user.access!=30 && !modobj) return res.sendError(null, 'Access denied');
    [err, questionobj] = await to(question.findOne({
      where : { id: req.params.id}
    }));
    if(err) {
      return res.sendError(err);
    }
    if(!questionobj) res.sendError(null,'Question doesnt exist');
    return res.sendSuccess(questionobj, 'Successfully displaying questions');
  };
  
  exp.addquestion = async (req, res) => {
    let err, questionobj,modobj;
    if(req.user.access < 20) res.sendError(null, 'Access denied');
    [err, questionobj] = await to(question.create({
      body: req.body.body,
      title: req.body.title,
      input_format: req.body.input_format,
      constraints: req.body.constraints,
      output_format: req.body.output_format,
      author: req.user.id,
      level: req.body.level,
      contest: req.body.contest,
      score: req.body.score,
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
    [err, questionobj] = await to(question.update({
      checker_path: path + '/' + questionobj.id
    }, { 
        where: {id: questionobj.id}
    }));
    if(err) {
      console.log(err);
      res.sendError(err);
    }
    if(req.user.access == 30)
      return res.sendSuccess(questionobj, 'Successfully added question');
    [err, modobj] = await to(moderator.create({
      user: req.user.id,
      question: questionobj.id
    }));      
    if (err) {
      console.log(err);
      return res.sendError(err);
    }
    return res.sendSuccess(null,'Successfully added question and moderator for it');
  };

  exp.updatequestion = async (req, res) => {
    let err, questionobj,modobj;
    [err, modobj] = await to(moderator.findOne({
      where : { 
        user: req.user.id,
        question: req.body.id
      }
    }));
    if(err) {
      console.log(err);
      res.sendError(err);
    }
    if(req.user.access!=30 && !modobj) res.sendError(null, 'Access denied');
    [err, questionobj] = await to(question.update({
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
    return res.sendSuccess(null, 'Successfully updated question');
  };

  exp.deletequestion = async (req, res) => {
    let err, questionobj,modobj;
    [err, modobj] = await to(moderator.findOne({
      where : { 
        user: req.user.id,
        question: req.body.id
      }
    }));
    if(err) {
      console.log(err);
      res.sendError(err);
    }
    if(req.user.access!=30 && !modobj) res.sendError(null, 'Access denied');
    [err, questionobj] = await to(question.destroy({
      where: {id: req.params.id}
    }));
    if(err) {
      console.log(err);
      res.sendError(err);
    }
    return res.sendSuccess(null, 'Successfully deleted question');
  };


  exp.addmoderator = async (req, res) =>{
    let modobj,err;
    if(req.user.access!=30) return res.sendError(null,'Access denied for user');
    [err, modobj] = await to(moderator.create({
      user: req.body.user,
      question: req.body.question
    }));      
    if (err) {
      console.log(err);
      return res.sendError(err);
    }
    return res.sendSuccess(modobj,'Moderator added successfully');
  };

  exp.deletemoderator = async (req, res) =>{
    let err,modobj;
    if(req.user.access!=30) return res.sendError(null,'Access denied for user');
    [err, modobj] = await to(
      moderator.findOne({
        where: { user: req.params.id }
      })
    );
    if (err) {
      console.log(err);
      return res.sendError(err);
    }
    if(!modobj) res.sendError(null,'Doesnt exist');
    [err, modobj] = await to(moderator.destroy({
      where: { user: req.params.id }
    }));
    if(err) return res.sendError(err);
    return res.sendSuccess(null,'Successfully deleted moderator');
  };

  /*exp.addtestcase = async (req, res) =>{
    let err, testobj;
    let inpath = path + '/'+ req.body.question + '/input/' + req.body.id + '.txt';
    let outpath = path + '/'+ req.body.question + '/output/' + req.body.id + '.txt';
    fs.writeFile(inpath.req.body.input, (err)=>{
      if(err){
        console.log(err);
        res.sendError(err);
      }
      console.log(req.body.id + 'input file saved');
    });
    fs.writeFile(outpath,req.body.output, (err)=>{
      if(err){
        console.log(err);
        res.sendError(err);
      }
      console.log(req.body.id + 'output file saved');
    });    
    [err, testobj] = await to(testcase.create({
      question: req.body.question,
      sample: req.body.sample,
      weight: req.body.weight,
      input_path: inpath,
      output_path: outpath
    }));
    (err){
      console.log(err);
      res.sendError(err);
    }
    return res.sendSuccess(null, 'Test case added successfully.');    
  };*/

  // exp.addtestcase = async (req, res) => {
  //   let err, testobj;
  //   let temp = 'defaultpath';
  //   console.log(req.body);
  //   [err, testobj] = await to(testcase.create({
  //     question: req.body.question,
  //     sample: req.body.sample,
  //     weight: req.body.weight,
  //     explanation: req.body.explanation,
  //     input_path: temp,
  //     output_path: temp
  //   })); 
  //   if(err) {
  //     console.log(err);
  //     res.sendError(err);
  //   }
  //   console.log('Added to the database');    
  //   let inpath = path + '/'+ req.body.question + '/input/' + testobj.id + '.txt';
  //   let outpath = path + '/'+ req.body.question + '/output/' + testobj.id + '.txt';
    
  //   let busboy = new Busboy({headers: req.headers});
  //   busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
  //     if(fieldname == 'inputfile')
  //       file.pipe(fs.createWriteStream(inpath));
  //     else if(fieldname == 'outputfile')
  //       file.pipe(fs.createWriteStream(outpath));
  //   });
  //   busboy.on('finish', function() {
  //     console.log('Upload complete');
  //     //res.writeHead(200, { 'Connection': 'close' });
  //   });  
  //   [err, testobj] = await to(testcase.update({
  //     input_path: inpath,
  //     output_path: outpath
  //   }, {
  //       where : {id: testobj.id}
  //   }));
  //   if(err) {
  //     console.log(err);
  //     res.sendError(err);
  //   }  
  //   return res.sendSuccess(null, 'Test case added along with file upload');
  // };

  exp.addtestcase = async (req, res) => {
    if(!req.files.inputfile || !req.files.outputfile)
      return res.sendError(null,'Invalid query format');
    let err, testobj;
    [err, testobj] = await to(testcase.create(req.body));
    if(err) return res.sendError(err);
    let inpath = Path.join(__dirname,'..','questions',req.body.question,'input',testobj.id+'.txt');
    let outpath = Path.join(__dirname,'..','questions',req.body.question,'output',testobj.id+'.txt');
    req.files.inputfile.mv(inpath,async err=>{
      if(err) return res.sendError(err);
      req.files.outputfile.mv(outpath,async err=>{
        if(err) return res.sendError(err);
        [err, testobj] = await to(testcase.update({
          input_path: inpath,
          output_path: outpath
        }, {
          where: { id: testobj.id }
        }));
        if(err) return res.sendError(err);
        return res.sendSuccess(null, 'Testcase added successfully');
      });
    });
  };

  exp.deletetestcase = async (req, res) => {
    let err, testobj;
    [err, testobj] = await to(testcase.findOne({
      where: {id: req.params.id}
    }));
    if (err) {
      console.log(err);
      res.sendError(err);
    }
    if(!testobj) { res.sendError('Testcase does not exist');
    }
    let inpath = path + '/'+ testobj.question + '/input/' + testobj.id + '.txt';
    let outpath = path + '/'+ testobj.question + '/output/' + testobj.id + '.txt';
    fs.access(inpath, err => {
      fs.unlinkSync(inpath);
      if(err) {
        console.log(err);
        res.sendError(err);
      }
    });
    fs.access(outpath, err => {
      fs.unlinkSync(outpath);
      if(err) {
        console.log(err);
        res.sendError(err);
      }
    });
  };

  return exp;
}