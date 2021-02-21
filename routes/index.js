// npm imports
const express = require("express");

// local imports
const authRouter = require("./auth");

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/auth", authRouter);

module.exports = router;
