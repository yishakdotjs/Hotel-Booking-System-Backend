
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
//const Payment = require('./Payment')

const BookingSchema = new Schema({
    bookerID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        //add required and set to true
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
    BookingInfo: [{
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
        roomAmount:{
            type:String,
            required:true
        }
    }],
    isPast:{
        type:Boolean,
        required:true,
        default:false
    }

});



const Booking = mongoose.model('bookings', BookingSchema);

module.exports = Booking;