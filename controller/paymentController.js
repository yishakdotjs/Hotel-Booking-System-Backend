const Payment = require('../models/payment')

const PaymentController = {
    addPayment: async (req, res) => {
        /*const {
            //paymentCode
            userID, checkInDate, checkOutDate, paymentID,
            bookingInfo: [{pax:[{name, adultStatus, gender,age,}], roomType,roomID, roomAmount}],
            /!*"results": [
                {
                    "po_number": "PO1001",
                    "product_id": "PD1001",
                    "message": "Exists",
                    "timestamp": "2016-05-01"
                }]*!/
        } = req.body

        try{
            const newReservation = new Payment ({userID, checkInDate, checkOutDate, paymentID,
                bookingInfo: [{pax:[{name, adultStatus, gender,age,}], roomType,roomID, roomAmount}]
            })
            await newReservation.save()
            if(newReservation){
                res.status(200).json({msg:"Room booked successfully"})
            }
        }catch(e){
            return  res.status(500).json({msg: e.message})
        }*/
    },
    updatePayment: async (req, res) => {
        /*const {userID, bookingId, checkInDate, checkOutDate, paymentID,
            bookingInfo: [{pax:[{name, adultStatus, gender,age,}], roomType,roomID, roomAmount}],
        } = req.body
        //const {userID} = req.params;
        //console.log("req-body: " + JSON.stringify(req.body));
        try {
            let reservation = await Book.findOneAndUpdate(
                {_id: bookingId},
                {$set: {
                        checkInDate,
                        checkOutDate,
                        paymentID,
                        bookingInfo:[{pax:[{name, adultStatus, gender,age,}], roomType,roomID,roomAmount}]
                    }})
            await reservation.save()
            if (reservation) {
                await res.status(200).json({msg: "update successful", reservation});
            }
        } catch(e){
            return  res.status(500).json({msg: e.message})
        }*/
    },
    deletePayment: async (req, res) => {
        /*const {userID, bookingId} = req.body
        try{
            const reservation = await Book.deleteOne({_id: bookingId})
            if (reservation) {
                await res.status(201).json("user successfully deleted");
            }
        } catch(e){
            return  res.status(500).json({msg: e.message})
        }*/
    },
    getPaymentByPaymentID: async (req, res)=>{
        /*const {bookingId} = req.body
        try{
            const reservation = await Book.findById(bookingId)
            if(reservation)
                return res.status(200).json({msg:"reservation" + reservation})
            //res.json(user)
        }
        catch(e){
            return  res.status(500).json({msg: e.message})
        }*/
    },
    getUserPayment: async (req, res)=>{
        /*const {userID} = req.body
        try{
            const reservation = await Book.findOne(userID)
            if(reservation)
                return res.status(200).json({msg:"reservation" + reservation})
            //res.json(user)
        }
        catch(e){
            return  res.status(500).json({msg: e.message})
        }*/
    },
    listAllPayments: async (req, res) => {
        /*try{
            const reservations = await Book.find({})
            await res.status(201).json({reservations})
        }  catch(e){
            return  res.status(500).json({msg: e.message})
        }*/
    }
}

module.exports =  PaymentController;