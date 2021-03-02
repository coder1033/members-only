// npm imports
const express = require("express");

// require controllers
const message_controller = require("../controllers/message-controller");

// require validators
const message_validator = require("../validators/message-validator");

const router = express.Router();

router.get("/create-message", message_controller.message_create_get);

router.post(
  "/create-message",
  message_validator.message_create,
  message_controller.message_create_post
);

router.get("/delete-message/:id", message_controller.message_delete_get);

router.post("/delete-message/:id", message_controller.message_delete_post);

module.exports = router;
