// npm imports
const { body } = require("express-validator");

exports.create_message = [
  // Validate and santise fields.
  body("title")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be specified and of minimum length 3.")
    .isLength({ max: 50 })
    .withMessage("Title must be of maximum length 50.")
    .escape(),

  body("description")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Description must be specified and of minimum length 3.")
    .isLength({ max: 500 })
    .withMessage("Description must be of maximum length 500.")
    .escape(),
];
