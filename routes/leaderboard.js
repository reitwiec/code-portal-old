const {
    submissions
} = require('../models');
const {
    user
} = require('../models');
const to = require('../utils/to');
var sequelize = require('sequelize');
const client = require('../utils/cache');

module.exports = () => {
    let exp = {};
    exp.showleaderboard = async (req, res) => {
        const Page = req.query.page;
        const toDisplay = req.query.count;
        client.zrangebyscore(req.params.contest, 1, 10000, 'LIMIT', (Page-1)*toDisplay, toDisplay, (err, leaderboard) => {
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
                submissions.findAll({
                        where: {
                            contest: req.params.contest
                        },
                        raw: true,
                        attributes: {
                            include: [
                                sequelize.fn('MAX', sequelize.col('points')),
                            ],
                            exclude: []
                        },
                        group: ['user', 'question']
                    })
                    .then((users) => {
                        // Iterate in users and calculate total score for each user
                        users.forEach((item, index) => {
                            if (LB.has(item.user)) {
                                let temp = LB.get(item.user);
                                LB.set(item.user, temp + item['MAX(`points`)']);
                            } else {
                                LB.set(item.user, item['MAX(`points`)']);
                            }
                            // console.log(item.user + ' ' + item.points);
                        });
                    })
                    .then(() => {
                        var promises = [];
                        LB.forEach((value, key, map) => {
                            // Find Username from User Table
                            // Query returns a promise that we push to an array and resolve later
                            promises.push(user.findOne({
                                where: {
                                    id: key
                                }
                            }));
                        });

                        if (LB.length == 0) {
                            return res.sendSuccess(null, 'No submissions have been made yet');
                        }

                        Promise.all(promises).then((users) => {
                                for (var i in users) {
                                    Leaderboard.push({
                                        userid: users[i].id,
                                        username: users[i].name,
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
                                    Leaderboard.forEach((member) => {
                                        client.zadd(req.params.contest, member.rank, JSON.stringify(member), (err, response) => {
                                            if (err) console.log(err);
                                        });
                                    });
                                    client.expire(req.params.contest, 30);
                                    client.zrangebyscore(req.params.contest, 1, 10000, 'LIMIT', (Page-1)*toDisplay, toDisplay, (err, leaderboard) => {
                                        if (err) {
                                            console.log(err);
                                            return res.sendError(err);
                                        }
                                        for(let i = 0; i < leaderboard.length; i++) {
                                            leaderboard[i] = JSON.parse(leaderboard[i]);
                                        }
                                        return res.sendSuccess(leaderboard, "Leaderboard just calculated.");
                                    });
                                }
                            })
                            .catch(err => console.log(err));

                    })
                    .catch(err => console.log(err));

            } else {
                for(let i = 0; i < leaderboard.length; i++) {
                    leaderboard[i] = JSON.parse(leaderboard[i]);
                }
                return res.sendSuccess(leaderboard, "Sent from cache.");
            }
        });
    }

    return exp;
}