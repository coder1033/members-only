// npm imports
const bcrypts = require("bcryptjs");
const passport = require("passport");
const { validationResult } = require("express-validator");

// local imports
const User = require("../models/user");

exports.auth_sign_up_get = function (req, res, next) {
  res.render("sign-up", { title: "Sign Up" });
};

exports.auth_sign_up_post = function (req, res, next) {
  const { first_name, last_name, username, password } = req.body;

  // Extract the validation errors from a request.
  const errors = validationResult(req);

  const user = new User({
    first_name,
    last_name,
    username,
    password,
  });

  if (!errors.isEmpty()) {
    res.render("sign-up", { title: "Sign Up", errors: errors.array(), user });
    return;
  }

  bcrypts.hash(password, 10, function (err, hashedPassword) {
    if (err) {
      return next(err);
    }

    const user = new User({
      first_name,
      last_name,
      username,
      password: hashedPassword,
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }

      res.redirect("/auth/log-in");
    });
  });
};

exports.auth_log_in_get = function (req, res, next) {
  const errors = req.flash("error");
  res.render("log-in", { title: "Log In", errors });
};

exports.auth_log_in_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "log-in",
  failureFlash: true,
});

exports.auth_log_out_get = function (req, res, next) {
  req.logout();
  res.redirect("/");
};
