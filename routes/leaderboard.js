const { submission, contest } = require('../models');
const { user } = require('../models');
const to = require('../utils/to');
var sequelize = require('sequelize');
const client = require('../utils/cache');

module.exports = () => {
  let exp = {};
  exp.showleaderboard = async (req, res) => {
    const Page = req.query.page;
    const toDisplay = req.query.count;
    const [err, contestObj] = await to(
      contest.findOne({ where: { slug: req.params.contest } })
    );
    if (err) return res.sendError();
    if (!contestObj) return res.sendError(null, 'Contest not found', 404);
    const contest_id = contestObj.id;
    client.zrangebyscore(
      contest_id,
      1,
      10000,
      'LIMIT',
      (Page - 1) * toDisplay,
      toDisplay,
      (err, leaderboard) => {
        if (err) {
          console.log(err);
          return res.sendError(err);
        }

        // leaderboard.forEach((member) => {
        //     member = JSON.parse(member);
        // });

        if (leaderboard.length == 0) {
          let LB = new Map();
          let Leaderboard = [];
          submission
            .findAll({
              where: {
                contest_id: contest_id
              },
              raw: true,
              attributes: [
                'user_id',
                'question_id',
                sequelize.fn('MAX', sequelize.col('points'))
              ],
              // {
              //   include: ,
              //   exclude: []
              // }
              group: ['user_id', 'question_id']
            })
            .then(users => {
              // Iterate in users and calculate total score for each user
              users.forEach((item, index) => {
                if (LB.has(item.user_id)) {
                  let temp = LB.get(item.user_id);
                  LB.set(item.user_id, temp + item['MAX(`points`)']);
                } else {
                  LB.set(item.user_id, item['MAX(`points`)']);
                }
              });
            })
            .then(() => {
              var promises = [];
              LB.forEach((value, key, map) => {
                // Find Username from User Table
                // Query returns a promise that we push to an array and resolve later
                promises.push(
                  user.findOne({
                    where: {
                      id: key
                    }
                  })
                );
              });

              if (LB.size == 0) {
                return res.sendSuccess(
                  { contest: contestObj, leaderboard: [] },
                  'No submissions have been made yet'
                );
              }

              Promise.all(promises)
                .then(users => {
                  for (var i in users) {
                    Leaderboard.push({
                      userid: users[i].id,
                      name: users[i].name,
                      username: users[i].username,
                      points: LB.get(users[i].id)
                    });
                  }

                  // Sort the leaderboard
                  Leaderboard.sort((a, b) => {
                    // Compare Function
                    if (a.points > b.points) {
                      return -1;
                    }
                    if (a.points < b.points) {
                      return 1;
                    }
                    return 0;
                  });

                  // Assigning Rank
                  var Rank = 1;
                  Leaderboard[0].rank = Rank;
                  for (var i = 1; i < Leaderboard.length; i++) {
                    if (Leaderboard[i].points != Leaderboard[i - 1].points)
                      Rank++;
                    Leaderboard[i].rank = Rank;
                  }
                  // console.log(Leaderboard);
                  if (Leaderboard.length != 0) {
                    Leaderboard.forEach(member => {
                      client.zadd(
                        contest_id,
                        member.rank,
                        JSON.stringify(member),
                        (err, response) => {
                          if (err) console.log(err);
                        }
                      );
                    });
                    client.expire(contest_id, 30);
                    client.zrangebyscore(
                      contest_id,
                      1,
                      10000,
                      'LIMIT',
                      (Page - 1) * toDisplay,
                      toDisplay,
                      (err, leaderboard) => {
                        if (err) {
                          console.log(err);
                          return res.sendError(err);
                        }
                        for (let i = 0; i < leaderboard.length; i++) {
                          leaderboard[i] = JSON.parse(leaderboard[i]);
                        }
                        return res.sendSuccess(
                          {
                            contest: contestObj,
                            leaderboard
                          },
                          'Leaderboard just calculated.'
                        );
                      }
                    );
                  }
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        } else {
          for (let i = 0; i < leaderboard.length; i++) {
            leaderboard[i] = JSON.parse(leaderboard[i]);
          }
          return res.sendSuccess(
            { contest: contestObj, leaderboard },
            'Sent from cache.'
          );
        }
      }
    );
  };

  return exp;
};
