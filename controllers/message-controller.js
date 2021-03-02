// npm packages
const { validationResult } = require("express-validator");

// require models
const Message = require("../models/message");

exports.message_create_get = function (req, res, next) {
  if (req.user) {
    res.render("create-message", { title: "Create Message" });
  } else {
    res.redirect("/auth/log-in");
  }
};

exports.message_create_post = function (req, res, next) {
  const { title, description } = req.body;
  const user = req.user;

  // Extract the validation errors from a request.
  const errors = validationResult(req);

  const message = new Message({
    title,
    description,
    user,
  });
  if (!errors.isEmpty()) {
    res.render("create-message", {
      title: "Create Post",
      errors: errors.array(),
      message,
    });
    return;
  }
  message.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
