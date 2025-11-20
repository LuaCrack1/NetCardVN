const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  balance: { type: Number, default: 0 },
  role: { type: String, default: "user" }, // admin / user
});

module.exports = mongoose.model("User", UserSchema);
