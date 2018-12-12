const { contest } = require('../models');
const { question } = require('../models');


module.exports = ()=>{
  let exp = {};
  exp.showcontests = async (req, res) =>{
    contest.findAll().then(contests=>{
		res.send(contests);
	});
  };

  exp.addcontest = async (req, res) =>{
    const newcontest = {
		id: req.body.id,
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        description: req.body.description,
        visibility: req.body.visibility,
        slug: req.body.slug
	};
	contest.create(newcontest);
	res.send(newcontest);
  };

  return exp;
}