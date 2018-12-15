const { submissions } = require('../models');
const redisStore = require('./config/redis')(session);
const to = require('../utils/to');

module.exports = () => {
    let exp = {};
    exp.showleaderboard = async(req, res) => {
        const id = req.params.contestid;
        
    }
}