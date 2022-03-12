const Book = require("../models/booking");

const BookingController = {
  addReservation: async (req, res) => {
    // try {
    //   const {
    //     userID,
    //     checkInDate,
    //     checkOutDate,
    //     paymentID,
    //     bookingInfo: [
    //       {
    //         pax: [{ name, adultStatus, gender, age }],
    //         roomType,
    //         roomID,
    //         roomAmount,
    //       },
    //     ],
    //     /*"results": [
    //                   {
    //                       "po_number": "PO1001",
    //                       "product_id": "PD1001",
    //                       "message": "Exists",
    //                       "timestamp": "2016-05-01"
    //                   }]*/
    //   } = req.body;

    //   const newReservation = new Book({
    //     userID,
    //     checkInDate,
    //     checkOutDate,
    //     paymentID,
    //     bookingInfo: [
    //       {
    //         pax: [{ name, adultStatus, gender, age }],
    //         roomType,
    //         roomID,
    //         roomAmount,
    //       },
    //     ],
    //   });
    //   await newReservation.save();
    //   if (newReservation) {
    //     res.status(200).json({ msg: "Room booked successfully" });
    //   }
    // } catch (e) {
    //   return res.status(500).json({ msg: e.message });
    // }

    try {
      //   const {
      //     userId,
      //     userEmail,
      //     checkInDate,
      //     checkOutDate,
      //     paymentID,
      //     bookingInfo: [
      //       {
      //         pax: [{ name, adultStatus, gender, age }],
      //       },
      //     ],
      //     roomType,
      //     roomID,
      //     roomAmount,
      //     bookCode,
      //     paymentStatus,
      //     isPast,
      //   } = req.body;

      // console.log(req.body.bookingInfo.pax[0].adultStatus);

      const newBook = new Book({
        userEmail: req.body.userEmail,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        paymentID: req.body.paymentID,
        bookingInfo: [
          {
            pax: [
              {
                name: req.body.name,
                adultStatus: req.body.adultStatus,
                gender: req.body.gender,
                age: req.body.age,
              },
            ],
            roomType: req.body.roomType,
            roomID: req.body.roomID,
            roomAmount: req.body.roomAmount,
          },
        ],
        bookCode: req.body.bookCode,
        paymentStatus: req.body.paymentStatus,
        isPast: req.body.isPast,
      });

      await newBook.save();
      if (newBook) {
        res.status(200).json({ msg: "Room booked successfully" });
      }
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  updateReservation: async (req, res) => {
    const {
      userID,
      bookingId,
      checkInDate,
      checkOutDate,
      paymentID,
      bookingInfo: [
        {
          pax: [{ name, adultStatus, gender, age }],
          roomType,
          roomID,
          roomAmount,
        },
      ],
    } = req.body;
    //const {userID} = req.params;
    //console.log("req-body: " + JSON.stringify(req.body));
    try {
      let reservation = await Book.findOneAndUpdate(
        { _id: bookingId },
        {
          $set: {
            checkInDate,
            checkOutDate,
            paymentID,
            bookingInfo: [
              {
                pax: [{ name, adultStatus, gender, age }],
                roomType,
                roomID,
                roomAmount,
              },
            ],
          },
        }
      );
      await reservation.save();
      if (reservation) {
        await res.status(200).json({ msg: "update successful", reservation });
      }
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  cancelReservation: async (req, res) => {
    try {
      // const reservation = await Book.deleteOne({ _id: bookingId });
      const reservation = await Book.deleteOne({ _id: req.params.id });
      if (reservation) {
        await res.status(201).json("user successfully deleted");
      }
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  getReservationInfoByBookID: async (req, res) => {
    const { bookingId } = req.body;
    try {
      const reservation = await Book.findById(bookingId);
      if (reservation)
        return res.status(200).json({ msg: "reservation" + reservation });
      //res.json(user)
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  getReservationInfoByUserID: async (req, res) => {
    const { userID } = req.body;
    try {
      const reservation = await Book.findOne(userID);
      if (reservation)
        return res.status(200).json({ msg: "reservation" + reservation });
      //res.json(user)
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  listAllReservations: async (req, res) => {
    try {
      const reservations = await Book.find({});
      await res.status(201).json({ reservations });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
};

module.exports = BookingController;
