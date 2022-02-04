const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const Roles = require("./role");
const bcrypt = require("bcryptjs");

//create ninja Schema and model
const UserSchema = new Schema({
  full_name: {
    type: String,
    required: [true, "Name field is required"],
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email invalid!");
      }
    },
  },
  password: {
    type: String,
    required: [true, "password field is required"],
    trim: true,
    minlength: [8, "Minimum password length is 8 characters"],
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Your can not contain the word '" + value);
      }
    },
  },
  mobile_number: {
    type: Number,
  },
  nationality: {
    type: String,
  },
  country_zip_code: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  gender: {
    type: String,
  },
  user_role: {
    type: Number,
    default: "0",
  },
  //add in geo location
});

const User = mongoose.model("users", UserSchema);

User.findOne({
  email: "admin@admin.com",
}).then((data) => {
  if (data === null) {
    const newUser = new User({
      full_name: "Admin User",
      username: "admin",
      email: "admin@admin.com",
      password: bcrypt.hashSync("admin", 10).toString(),
      country_zip_code: "1000",
    });

    newUser.save();
  }
});

module.exports = User;
