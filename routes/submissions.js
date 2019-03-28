const {
  submission,
  subtestcase,
  language,
  question,
  testcase,
  contest
} = require('../models');
const uuid = require('uuid/v4');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const submissions_dir = path.join(__dirname, '..', 'submissions');

const read_file_promise = source => {
  return new Promise((resolve, reject) => {
    fs.readFile(source, 'utf8', (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

module.exports = io => {
  let exp = {};
  exp.submit = async (req, res) => {
    try {
      let ques = await question.findByPk(req.body.question);
      let lang = await language.findByPk(req.body.language);
      if (!ques || !lang) return res.sendError(null, 'Invalid Input');
      let cont = await contest.findByPk(ques.contest_id);
      if (new Date(cont.start) > new Date() && req.user.access < 30)
        return res.sendError(null, 'Contest not yet started');
      let totalWeight = 0;
      let maxScore = parseFloat(ques.score);
      let cases = await testcase.findAll({
        where: {
          question_id: ques.id
        }
      });
      let casesJSON = {};
      cases.forEach(element => {
        casesJSON[element.id] = element;
        totalWeight += parseFloat(element.weight);
      });
      // console.log(cases);
      let src = req.body.source;
      let src_path = path.join(submissions_dir, uuid() + '.txt');
      fs.writeFile(src_path, src, async err => {
        if (err) return res.sendError(err);
        try {
          let sub = await submission.create({
            path: src_path,
            contest_id: ques.contest_id,
            verdict: 'PROCESSING',
            points: 0,
            language_id: lang.id,
            question_id: ques.id,
            user_id: req.user.id
          });
          let subcases = cases.map(e => {
            return {
              verdict: 'PROC',
              submission_id: sub.id,
              testcase_id: e.id
            };
          });
          await subtestcase.bulkCreate(subcases);
          res.sendSuccess(sub.id);
          subcases = await subtestcase.findAll({
            where: {
              submission_id: sub.id
            }
          });
          // console.log(subcases);
          let score = 0,
            i;
          for (i = 0; i < subcases.length; i++) {
            let subcase = subcases[i];
            let input = await read_file_promise(
              casesJSON[subcase.testcase_id].input_path
            );
            let output = await read_file_promise(
              casesJSON[subcase.testcase_id].output_path
            );
            let result;
            try {
              result = await axios.post(
                process.env.JUDGE_API,
                {
                  source_code: req.body.source,
                  language_id: lang.code,
                  stdin: input,
                  expected_output: output,
                  cpu_time_limit: lang.multiplier * ques.time_limit
                },
                {
                  maxContentLength: 52428890
                }
              );
            } catch (err) {
              console.log('axios error');
              return res.sendError();
            }
            // console.log(result);
            let status = result.data.status.id;
            let verdict = 'PROC';
            if (status == 3) {
              verdict = 'AC';
              score += casesJSON[subcase.testcase_id].weight;
            } else if (status == 4) verdict = 'WA';
            else if (status == 5) verdict = 'TLE';
            else if (status == 6) {
              verdict = 'CE';
              break;
            } else verdict = 'RE';
            await subtestcase.update(
              {
                verdict
              },
              {
                where: {
                  id: subcase.id
                }
              }
            );
            io.emit('testcase_result', {
              id: subcase.id,
              points: ((score / totalWeight) * maxScore).toFixed(0),
              verdict
            });
          }
          // Compilation Error exits and does not do compilation everytime
          if (i < subcases.length) {
            await subtestcase.update(
              {
                verdict: 'CE',
                points: 0
              },
              {
                where: {
                  submission_id: sub.id
                }
              }
            );
            await submission.update(
              {
                verdict: 'CE'
              },
              {
                where: {
                  id: sub.id
                }
              }
            );
            io.emit('submission_result_ce', {
              id: sub.id
            });
          } else {
            //other cases
            let verdict = 'PARTIAL';
            if (score == 0) verdict = 'WRONG';
            else if (score == totalWeight) verdict = 'CORRECT';
            score = (score / totalWeight) * maxScore;
            await submission.update(
              {
                verdict,
                points: score
              },
              {
                where: {
                  id: sub.id
                }
              }
            );
            io.emit('submission_result', {
              id: sub.id,
              points: score,
              verdict
            });
          }
        } catch (err) {
          return res.sendError(err);
        }
      });
    } catch (err) {
      return res.sendError(err);
    }
  };

  exp.get_submission = async (req, res) => {
    let sub = await submission.findByPk(req.query.id, {
      include: [
        {
          model: contest,
          as: 'contest',
          attributes: ['title', 'slug']
        },
        {
          model: question,
          as: 'question',
          attributes: ['title', 'slug', 'score']
        }
      ]
    });
    if (!sub) return res.sendError(null, 'Invalid Input');
    if (sub.user_id != req.user.id) return res.sendError(null, 'Access Denied');
    delete sub.path;
    let cases = await subtestcase.findAll({
      where: {
        submission_id: req.query.id
      }
    });
    sub.path = undefined;
    delete sub.path;
    return res.sendSuccess({
      sub,
      cases
    });
  };

  exp.view_submissions = async (req, res) => {
    let err, result, submissions;
    [err, result] = await to(
      question.findOne({
        where: {
          slug: req.params.question_slug,
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
          attributes: ['id', 'score', 'slug', 'title']
        })
      })
    );
    if (err) return res.sendError(err);
    if (!result) return res.sendError(null, 'Question not found');

    [err, submissions] = await to(
      submission.findAll({
        where: {
          user_id: req.user.id,
          question_id: result.id
        },
        attributes: ['id', 'points', 'verdict', 'created_at']
      })
    );
    if (err) return res.sendError(err);
    if (!submissions) return res.sendError(null, 'No submissions yet');
    res.sendSuccess({ submissions, question: result });
  };

  return exp;
};
