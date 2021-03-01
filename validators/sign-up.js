// npm imports
const { body } = require("express-validator");

// local imports
const User = require("../models/user");

exports.sign_up = [
  // Validate and santise fields.
  body("first_name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name must be specified and of minimum length 3.")
    .isLength({ max: 50 })
    .withMessage("First name must be of maximum length 50.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters.")
    .escape(),

  body("last_name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last name must be specified and of minimum length 3.")
    .isLength({ max: 50 })
    .withMessage("Last name must be of maximum length 50.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters.")
    .escape(),

  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be specified and of minimum length 3.")
    .isLength({ max: 30 })
    .withMessage("Username must be of maximum length 30.")
    .isAlphanumeric()
    .withMessage("Username has non-alphanumeric characters.")
    .custom(async function (username) {
      const found = await User.findOne({ username }, "_id");
      if (found) return Promise.reject("Username already exists.");
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be of minimum length 8.")
    .isLength({ max: 128 })
    .withMessage("Password must be of maximum length 128"),

  body("confirm_password").custom(async function (confirm_password, { req }) {
    const { password } = req.body;
    if (confirm_password !== password)
      return Promise.reject("Confirm Password does not matches with Password.");
  }),
];
