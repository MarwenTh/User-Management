const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: "First Name is required",
    },
    lastName: {
      type: String,
      required: "Last Name is required",
    },
  },
  email: {
    type: String,
    unique: { message: "Email already exists" },
    match: [/.+\@.+\..+/, "Invalid email"],
  },

  password: {
    type: String,
    required: "Password is required",
  },
  posting_date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Users", usersSchema);
