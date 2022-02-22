
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
//const Payment = require('./Payment')

const BookingSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true
        /*ref: 'User'*/
        //add required and set to true
    },
    userEmail:{
      type:String
    },
    checkInDate:{
        type:Date,
        required:true
    },
    checkOutDate:{
        type:Date,
        required:true
    },
    paymentID:{
        type:Schema.Types.ObjectId,
        ref:'Payment'
    },
    bookingInfo: [{
        "pax":[{
            name: {
                type: String
                //required: true
            },
            adultStatus: {
                type:String
                //required: true
            },
            gender:{
                type:String
                //required: true
            },
            age:{
                type:Number
            }
        }],
        roomType: {
            type:String,
            required:true
        },
        roomID:{
            type: Schema.Types.ObjectId
        },
        roomAmount:{
            type:String,
            required:true
        }
    }],
    bookCode:{
        type:String
    },
    paymentStatus:{
        type:String
    },
    isPast:{
        type:Boolean,
        required:true,
        default:false
    }

});

const Booking = mongoose.model('bookings', BookingSchema);

module.exports = Booking;