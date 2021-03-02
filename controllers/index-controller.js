// require models
const Message = require("../models/message");
const User = require("../models/user");

// environment variables
require("dotenv").config();

exports.index = function (req, res, next) {
  Message.find({}, function (err, messages) {
    if (err) {
      return next(err);
    }
    res.render("index", { title: "ChatHouse", messages });
  });
};

exports.membership_get = function (req, res, next) {
  res.render("membership", { title: "Membership" });
};

exports.membership_post = function (req, res, next) {
  const { membership_passcode } = req.body;
  const { _id } = req.user;

  if (membership_passcode == process.env.MEMBERSHIP_PASSCODE) {
    User.findByIdAndUpdate(
      { _id },
      { membership: true },
      function (err, updated_user) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      }
    );
  } else {
    res.render("membership", {
      title: "Membership",
      errors: ["Incorrect Passcode"],
    });
  }
};
