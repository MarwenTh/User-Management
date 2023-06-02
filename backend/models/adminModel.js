const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "username is required",
  },
  password: {
    type: String,
    required: "password is required",
  },
});

module.exports = mongoose.model("Admin", adminSchema);
