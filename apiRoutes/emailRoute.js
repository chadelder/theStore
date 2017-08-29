var express = require("express");
var emailRoute = express.Router();
var User = require("../models/user");
var config = require("../config/database");
var nodemailer = require('nodemailer');


emailRoute.post('/', function(req, res, next) {
  User.findOne({email: req.body.email}, function (err){
    if (err) {
    throw err;
  };
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cjelder11@gmail.com',
      pass: 'Olive2216Lima'
    }
  });
  var mailOptions = {
    from: 'John Doe <johndoe@outlook.com',
    to: 'cjelder11@gmail.com',
    subject: 'Order submission',
    text: 'You have a new order '+req.body.name+'.',
    html: '<p>'+req.body.email+'</p>'
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if(error){
      console.log(error);
      res.redirect('/')
    } else {
      console.log('done');
      res.redirect('/');
    }
  });
});
});

module.exports = emailRoute;
