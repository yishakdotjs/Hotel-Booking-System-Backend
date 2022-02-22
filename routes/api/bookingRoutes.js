const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')

const BookingController = require('../../controller/bookingController')

router.post('/add_reservation', BookingController.addReservation)
router.put('/update_reservation',BookingController.updateReservation)
router.delete('/delete_reservation',BookingController.cancelReservation)
router.get('/find_reservation',BookingController.getReservationInfoByBookID)
router.get('/list_user_reservations',BookingController.getReservationInfoByUserID)
router.get('/list_all_reservations',BookingController.listAllReservations)
//router.get('/list_past_reservations')
//router.get('/filterUnavailableRooms')
//search for reservation using user email
//generate booking code to complete payment later
//apply cancelation policy
//expiration policy, algorithm and code how to apply
/*search filtering unavailable rooms when listing the rooms
I think that would be front end code tho*/
module.exports = router;