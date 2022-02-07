const express = require("express");
const router = express.Router();

const Booking = require("../../models/booking");

router.post("/", async (req, res) => {
  try {
    const data = {};
    const newBooking = new Booking();
    await newBooking.save();
    return res.status().send({ msg: "Success" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
