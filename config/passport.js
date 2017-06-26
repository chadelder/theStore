var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../app/models/user');
var config = require('../config/database'); // get db config file

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          console.log(jwt_payload);
          console.log(jwt_payload.id);
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);

          } else {
              done(null, false);
          }
      });
  }));
};


/*passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    const jwt_user_id = jwt_payload._doc._id
    User.findById(jwt_user_id, function(err, user)*/
