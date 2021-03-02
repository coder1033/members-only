const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, minlength: 3, maxlength: 50 },
  last_name: { type: String, required: true, minlength: 3, maxlength: 50 },
  username: { type: String, required: true, minlength: 3, maxlength: 30 },
  password: { type: String, required: true, minlength: 8, maxlength: 128 },
  membership: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
