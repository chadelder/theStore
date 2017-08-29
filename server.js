var express     = require('express');
var app         = express();
var path        = require('path');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config      = require('./config/database'); // get db config file
var port        = process.env.PORT || 3000;
var expressJwt = require("express-jwt");
var nodemailer = require('nodemailer');
//var cors        = require('cors');

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Make the app use the express-jwt authentication middleware on anything starting with "/api"
app.use("/api", expressJwt({secret: config.secret}));
app.use("/api/order", require("./apiRoutes/orderRoutes"));
app.use("/auth", require("./apiRoutes/authRoutes"));
app.use("/send", require("./apiRoutes/emailRoute"));

// log to console
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, "client")))
//app.use(express.static(__dirname + '/client'));

// connect to database
mongoose.connect(config.database);

//cors issue
app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
if (req.method === 'OPTIONS') {
res.end();
} else {
next();
}
});

// Start the server
app.listen(port);
console.log(port);
console.log('There will be dragons: http://localhost:' + port);
