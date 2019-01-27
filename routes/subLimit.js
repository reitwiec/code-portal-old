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

    exp.submissionLimit = async(req, res, next) => {
        client.exists(req.user.id, (err, reply, next) => {
            if(err) {
                console.log(err);
                return res.sendError(err);
            }
            
            if(reply == 0) {
                client.set(req.user.id, 1);
                client.expire(req.user.id, 60);
                return next();
            }
            else {
                res.sendError('Already submitted in the last 60 seconds');
            }

        });
    }
    
    return exp;
}
