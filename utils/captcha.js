const request = require('request');

const secret = '6LdYa5oUAAAAAH2vL1mGTwCG0cauc5XJyhalGrdo';

module.exports = async (req,res,next) => {
  if(process.env.MODE == 'DEV') return next();
  let data = {
    secret,
    response: req.body["g-recaptcha-response"]
  };
  let options = {
    method: 'post',
    form: data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: 'https://www.google.com/recaptcha/api/siteverify'
  };
  request.post(options, function (err, HTTPResponse, body) {
    if (err) {
      return res.send({success: false,msg: 'Captcha Invalid'});
    }
    body = JSON.parse(body);
    if (body.success == true) {
      return next();
    }
    else {
      return res.send({success: false,msg: 'Captcha Invalidated'});
    }
  });
}