// npm imports
const express = require("express");

// require models
const Message = require("../models/message");
const User = require("../models/user");

// require routers
const authRouter = require("./auth");
const messagesRouter = require("./messages");

// environment variables
require("dotenv").config();

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  Message.find({}, function (err, messages) {
    if (err) {
      return next(err);
    }
    res.render("index", { title: "ChatHouse", messages });
  });
});

router.use("/auth", authRouter);

router.use("/messages", messagesRouter);

router.get("/membership", function (req, res, next) {
  res.render("membership", { title: "Membership" });
});

router.post("/membership", function (req, res, next) {
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
});

module.exports = router;
