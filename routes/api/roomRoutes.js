const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const Room = require("../../models/room");

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.json({ rooms });
    return res.json({ rooms: rooms });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    return res.json({ room });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.delete("/:id", auth, async function (req, res) {
  try {
    if (!req.params.id || req.params.id === "") {
      return res.status(400).send("Something Went Wrong");
    }

    await Room.deleteOne({ _id: req.params.id });

    return res.status(200).json({ msg: "success" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/create", auth, async function (req, res) {
  try {
    if (
      !req.body.name ||
      !req.body.rentPerDay ||
      !req.body.type ||
      !req.body.maxCount ||
      !req.body.images ||
      !req.body.description
    ) {
      return res.status(400).json({ err: "Each Field is Required" });
    }

    if (
      req.body.name === "" ||
      req.body.rentPerDay === "" ||
      req.body.type === "" ||
      req.body.maxCount === "" ||
      req.body.images === "" ||
      req.body.description === ""
    ) {
      return res.status(400).json({ err: "Each Field is Required" });
    }

    const newRoom = new Room({
      name: req.body.name,
      maxcount: req.body.maxCount,
      rentperday: req.body.rentPerDay,
      type: req.body.type,
      description: req.body.description,
      imageurls: req.body.images,
    });

    newRoom.save();

    return res.status(200).json({ msg: "success" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/update/:id", auth, async function (req, res) {
  try {
    if (
      !req.body.name ||
      !req.body.rentPerDay ||
      !req.body.type ||
      !req.body.maxCount ||
      !req.body.images ||
      !req.body.description
    ) {
      return res.status(400).json({ err: "Each Field is Required" });
    }

    if (
      req.body.name === "" ||
      req.body.rentPerDay === "" ||
      req.body.type === "" ||
      req.body.maxCount === "" ||
      req.body.images === "" ||
      req.body.description === ""
    ) {
      return res.status(400).json({ err: "Each Field is Required" });
    }

    await Room.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      maxcount: req.body.maxCount,
      rentperday: req.body.rentPerDay,
      type: req.body.type,
      description: req.body.description,
      imageurls: req.body.images,
    });

    return res.status(200).json({ msg: "success" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
