// npm imports
const express = require("express");

// require controllers
const auth_controller = require("../controllers/auth-controller");

// require validator
const auth_validator = require("../validators/auth-validator");

const router = express.Router();

router.get("/sign-up", auth_controller.auth_sign_up_get);

router.post(
  "/sign-up",
  auth_validator.sign_up,
  auth_controller.auth_sign_up_post
);

router.get("/log-in", auth_controller.auth_log_in_get);

router.post("/log-in", auth_controller.auth_log_in_post);

router.get("/log-out", auth_controller.auth_log_out_get);

module.exports = router;
