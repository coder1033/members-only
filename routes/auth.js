// npm imports
const bcrypts = require("bcryptjs");
const express = require("express");
const passport = require("passport");
const { validationResult } = require("express-validator");

// local imports
const User = require("../models/user");

// require validator
const sign_up_validator = require("../validators/sign-up");

const router = express.Router();

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up", { title: "Sign Up" });
});

router.post("/sign-up", sign_up_validator.sign_up, function (req, res, next) {
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
});

router.get("/log-in", function (req, res, next) {
  const errors = req.flash("error");
  res.render("log-in", { title: "Log In", errors });
});

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "log-in",
    failureFlash: true,
  })
);

router.get("/log-out", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
