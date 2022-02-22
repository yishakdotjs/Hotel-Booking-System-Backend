const Mongoose = require("mongoose");

const roomSchema = Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  maxcount: {
    type: Number,
  },

  rentperday: {
    type: Number,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  //timestamps : true,
  imageurls: [],
  currentBookings: [],
});

const roomModel = Mongoose.model("rooms", roomSchema);

module.exports = roomModel;
