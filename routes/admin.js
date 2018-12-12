const { contest } = require('../models');
const { question } = require('../models');


module.exports = ()=>{
  let exp = {};
  exp.showcontests = async (req, res) =>{
    let err,contests;
    if(req.user.access!=30) return res.sendError(null,'Access denied for user');
    [err, contests] = await to(contest.findAll());
    if(err) return res.sendError(err);
    return res.sendSuccess(contests,'Successfully displaying contests');
  };

  exp.addcontest = async (req, res) =>{
    let newcontest,err;
    if(req.user.access!=30) return res.sendError(null,'Access denied for user');
    [err, newContest] = await to(contest.create({
      id: req.body.id,
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      description: req.body.description,
      visibility: req.body.visibility,
      slug: req.body.slug
    }));	
    if(err) return res.sendError(err);
	  return res.sendSuccess(null,'Contest added successfully');
  };

  return exp;
}