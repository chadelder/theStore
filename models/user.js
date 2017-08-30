var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

// set up a mongoose model

var UserSchema = new Schema({
  name: String,
  username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
          type: String,
          required: true
      },
    admin: {
      type: Boolean,
      default: false
    }
});

UserSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});
UserSchema.methods.checkPassword = function(passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};
UserSchema.methods.withoutPassword = function () {
    var user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model('User', UserSchema);
