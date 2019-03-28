const { contest } = require('../models');
const { question } = require('../models');
const { testcase } = require('../models');
const { moderator } = require('../models');
const { submission } = require('../models');
const to = require('../utils/to');
const fs = require('fs');
const Busboy = require('busboy');
const path = '../questions';
const Path = require('path');
const shell = require('shelljs');
const Sequelize = require('sequelize');

const read_file_promise = source => {
  return new Promise((resolve, reject) => {
    fs.readFile(source, 'utf8', (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

module.exports = () => {
  let exp = {};
  const Op = Sequelize.Op;
  exp.showcontests = async (req, res) => {
    let [err, contests] = await to(
      contest.findAll({
        ...(req.user.access < 30 && {
          where: {
            visibility: true
          }
        })
      })
    );
    if (err) return res.sendError(err);
    res.sendSuccess(contests, 'Successfully displaying contests');
  };

  exp.showcontestbyslug = async (req, res) => {
    let [err, contestobj] = await to(
      contest.findOne({
        where: {
          slug: req.params.slug
        }
      })
    );
    if (err) return res.sendError(err);
    if (!contestobj) return res.sendError(null, 'Contest does not exist', 404);
    if (new Date(contestobj.start) > new Date() && req.user.access < 30)
      return res.sendError(null, 'Contest not yet started', 200);
    let questions;
    [err, questions] = await to(
      question.findAll({
        where: {
          contest_id: contestobj.id,
          ...(req.user.access < 30 && {
            visibility: true
          })
        },
        ...(req.user.access < 30 && {
          attributes: ['title', 'slug', 'score', 'level', 'id']
        })
      })
    );
    if (err) return res.sendError(err);
    let obtained_score,
      scores = {};
    [err, obtained_score] = await to(
      submission.findAll({
        where: {
          user_id: req.user.id,
          contest_id: contestobj.id
        },
        attributes: [
          'question_id',
          [Sequelize.fn('MAX', Sequelize.col('points')), 'points']
        ],
        group: ['question_id']
      })
    );
    if (err) return res.sendError(err);
    for (let i = 0; i < obtained_score.length; i++) {
      scores[obtained_score[i].question_id] = obtained_score[i].points;
    }
    for (let i = 0; i < questions.length; i++) {
      if (scores[questions[i].id]) {
        questions[i]['dataValues']['attempted'] = true;
        questions[i]['dataValues']['obtained_score'] = scores[questions[i].id];
      } else {
        questions[i]['dataValues']['attempted'] = false;
      }
    }
    res.sendSuccess(
      {
        contest: contestobj,
        questions
      },
      'Successfully displaying contest'
    );
  };

  exp.addcontest = async (req, res) => {
    let [err, contestobj] = await to(contest.create(req.body));
    if (err && err.name === 'SequelizeUniqueConstraintError')
      return res.sendError(null, err.message, 409);
    if (err) return res.sendError(err);
    res.sendSuccess(null, 'Contest added successfully');
  };

  exp.updatecontest = async (req, res) => {
    let [err, contestobj] = await to(
      contest.update(req.body, {
        where: {
          slug: req.body.slug
        }
      })
    );
    if (err && err.name === 'SequelizeUniqueConstraintError')
      return res.sendError(null, err.message, 409);
    if (err) return res.sendError(err);
    if (contestobj[0] === 0)
      return res.sendError(null, 'Contest does not exist', 404);
    res.sendSuccess(null, 'Successfully updated contest');
  };

  exp.deletecontest = async (req, res) => {
    let [err, contestobj] = await to(
      contest.destroy({
        where: {
          slug: req.params.slug
        }
      })
    );
    if (err) return res.sendError(err);
    if (contestobj === 0)
      return res.sendError(null, 'Contest does not exist', 404);
    res.sendSuccess(null, 'Successfully deleted contest');
  };

  exp.showquestions = async (req, res) => {
    let err, questions;
    [err, questions] = await to(
      question.findAll({
        where: {
          is_practice: true
        }
      })
    );
    if (err) return res.sendError(err);
    res.sendSuccess(questions, 'Successfully displaying questions');
  };

  exp.showquestionbyslug = async (req, res) => {
    let [err, questionobj] = await to(
      question.findOne({
        where: {
          slug: req.params.slug,
          ...(req.user.access < 30 && {
            visibility: true
          })
        },
        include: {
          model: contest,
          as: 'contest',
          attributes: ['slug', 'title']
        },
        ...(req.user.access < 30 && {
          attributes: [
            'body',
            'constraints',
            'id',
            'input_format',
            'level',
            'output_format',
            'score',
            'slug',
            'title'
          ]
        })
      })
    );
    if (err) return res.sendError(err);
    if (!questionobj) return res.sendError(null, 'Question doesnt exist', 404);
    let samples, tests;
    [err, samples] = await to(
      testcase.findAll({
        where: {
          question_id: questionobj.id,
          sample: 1
        }
      })
    );
    let smp = [];
    try {
      for (let i = 0; i < samples.length; i++) {
        let input = await read_file_promise(samples[i].input_path);
        let output = await read_file_promise(samples[i].output_path);
        smp.push({
          input,
          output
        });
      }
    } catch (err) {
      return res.sendError(err);
    }
    res.sendSuccess(
      { question: questionobj, samples: smp },
      'Successfully displaying question'
    );
  };

  /*exp.showquestionsbycontest = async (req, res) => {
    let [err, questions] = await to(
      contest.findAll({
        where: { slug: req.params.contest_id },
        include: [
          {
            model: question,
            as: 'questions',
            attributes: ['id', 'title', 'body']
          }
        ]
      })
    );
    if (err) return res.sendError(err);
    res.sendSuccess(questions, 'Successfully displaying questions');
  };*/

  exp.showquestionsadmin = async (req, res) => {
    if (req.user.access < 20) return res.sendError(null, 'Access denied');
    let err, questions;
    if (req.user.access < 30) {
      [err, questions] = await to(
        question.findAll({
          include: [
            {
              model: moderators,
              where: {
                user_id: req.user.id
              }
              //[Op.or] : [{ user_id: req.user.id }, { question.author_id: req.user.id }]
            }
          ]
        })
      );
      if (err) return res.sendError(err);
      return res.sendSuccess(questions, 'Successfully displaying questions');
    }
    [err, questions] = await to(question.findAll());
    if (err) return res.sendError(err);
    res.sendSuccess(questions, 'Successfully displaying questions');
  };

  exp.showquestionbyslugadmin = async (req, res) => {
    if (req.user.access < 20) return res.sendError(null, 'Access denied');
    let err, questionobj;
    if (req.user.access < 30) {
      [err, questionobj] = await to(
        question.findOne({
          include: [
            {
              model: moderators,
              where: {
                user_id: req.user.id
              }
            }
          ],
          where: {
            slug: req.params.slug
          }
        })
      );
      if (err) return res.sendError(err);
      if (questionobj === 0)
        return res.sendError(null, 'Question doesnt exist');
      return res.sendSuccess(questionobj, 'Successfully displaying question');
    }
    [err, questionobj] = await to(
      question.findOne({
        where: {
          slug: req.params.slug
        }
      })
    );
    if (err) return res.sendError(err);
    if (questionobj === 0) return res.sendError(null, 'Question doesnt exist');
    res.sendSuccess(questionobj, 'Successfully displaying question');
  };

  exp.addquestion = async (req, res) => {
    let [err, questionobj] = await to(
      question.create({
        ...req.body,
        author_id: req.user.id
      })
    );
    if (err && err.name === 'SequelizeUniqueConstraintError')
      return res.sendError(null, err.message, 409);
    if (err) return res.sendError(err);
    [err, questionobj] = await to(
      question.update(
        {
          checker_path: path + '/' + questionobj.id,
          author_id: req.user.id
        },
        {
          where: {
            id: questionobj.id
          }
        }
      )
    );
    if (err) return res.sendError(err);
    return res.sendSuccess(null, 'Successfully added question');
  };

  exp.updatequestion = async (req, res) => {
    let err, questionobj, modobj;
    [err, modobj] = await to(
      moderator.findOne({
        where: {
          user_id: req.user.id,
          question_id: req.body.id
        }
      })
    );
    if (err) return res.sendError(err);
    if (req.user.access < 30 && modobj === 0)
      return res.sendError(null, 'Access denied');
    [err, questionobj] = await to(
      question.update(req.body, {
        where: {
          id: req.body.id
        }
      })
    );
    if (err && err.name === 'SequelizeUniqueConstraintError')
      return res.sendError(null, err.message, 409);
    if (err) return res.sendError(err);
    res.sendSuccess(null, 'Successfully updated question');
  };

  exp.deletequestion = async (req, res) => {
    let err, questionobj, modobj;
    [err, modobj] = await to(
      moderator.findOne({
        where: {
          user: req.user.id,
          question: req.body.id
        }
      })
    );
    if (err) return res.sendError(err);
    if (req.user.access != 30 && modobj === 0)
      return res.sendError(null, 'Access denied');
    [err, questionobj] = await to(
      question.destroy({
        where: {
          slug: req.params.slug
        }
      })
    );
    if (err) return res.sendError(err);
    if (questionobj === 0)
      return res.sendError(null, 'Question does not exist', 404);
    res.sendSuccess(null, 'Successfully deleted question');
  };

  exp.addmoderator = async (req, res) => {
    let [err, modobj] = await to(moderator.create(req.body));
    if (err && err.name === 'SequelizeUniqueConstraintError')
      return res.sendError(null, err.message, 409);
    if (err) return res.sendError(err);
    return res.sendSuccess(modobj, 'Moderator added successfully');
  };

  exp.deletemoderator = async (req, res) => {
    let [err, modobj] = await to(
      moderator.destroy({
        where: {
          user: req.params.id
        }
      })
    );
    if (err) return res.sendError(err);
    if (modobj === 0) return res.sendError(null, 'Moderator doesnt exist');
    return res.sendSuccess(null, 'Successfully deleted moderator');
  };

  // Refactored till here *****************************************************************

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
    if (!req.files.inputfile || !req.files.outputfile)
      return res.sendError(null, 'Invalid query format');
    let err, testobj;
    [err, testobj] = await to(testcase.create(req.body));
    if (err) return res.sendError(err);
    let inpath = Path.join(
      __dirname,
      '..',
      'questions',
      req.body.question_id,
      'input'
    );
    let outpath = Path.join(
      __dirname,
      '..',
      'questions',
      req.body.question_id,
      'output'
    );
    shell.mkdir('-p', inpath);
    shell.mkdir('-p', outpath);
    inpath = Path.join(inpath, testobj.id + '.txt');
    outpath = Path.join(outpath, testobj.id + '.txt');
    req.files.inputfile.mv(inpath, async err => {
      if (err) return res.sendError(err);
      req.files.outputfile.mv(outpath, async err => {
        if (err) return res.sendError(err);
        [err, testobj] = await to(
          testcase.update(
            {
              input_path: inpath,
              output_path: outpath
            },
            {
              where: {
                id: testobj.id
              }
            }
          )
        );
        if (err) return res.sendError(err);
        return res.sendSuccess(null, 'Testcase added successfully');
      });
    });
  };

  exp.deletetestcase = async (req, res) => {
    let err, testobj;
    [err, testobj] = await to(
      testcase.findOne({
        where: {
          id: req.params.id
        }
      })
    );
    if (err) {
      return res.sendError(err);
    }
    if (!testobj) {
      return res.sendError('Testcase does not exist');
    }
    let inpath =
      path + '/' + testobj.question + '/input/' + testobj.id + '.txt';
    let outpath =
      path + '/' + testobj.question + '/output/' + testobj.id + '.txt';
    fs.access(inpath, err => {
      fs.unlinkSync(inpath);
      if (err) {
        return res.sendError(err);
      }
    });
    fs.access(outpath, err => {
      fs.unlinkSync(outpath);
      if (err) {
        console.log(err);
        return res.sendError(err);
      }
    });
  };

  return exp;
};
