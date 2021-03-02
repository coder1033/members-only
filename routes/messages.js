// npm imports
const express = require("express");
const { validationResult } = require("express-validator");

// require models
const Message = require("../models/message");

// require validators
const create_message_validator = require("../validators/create-message");

const router = express.Router();

router.get("/create-message", function (req, res, next) {
  if (req.user) {
    res.render("create-message", { title: "Create Message" });
  } else {
    res.redirect("/auth/log-in");
  }
});

router.post(
  "/create-message",
  create_message_validator.create_message,
  function (req, res, next) {
    const { title, description } = req.body;
    const user = req.user;
    
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const message = new Message({
      title,
      description,
      user
    });
    if (!errors.isEmpty()) {
      res.render("create-message", { title: "Create Post", errors: errors.array(), message });
      return;
    }
    message.save(function(err){
      if(err){
        return next(err);
      }
      res.redirect("/");
    });
  }
);

module.exports = router;
