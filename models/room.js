const Mongoose = require("mongoose");

const roomSchema = Mongoose.Schema({
    name : {
        type:String,
        required : true
    },
    maxcount : {
        type: Number,
    },

    RentPerDay : {
        type: Number,
    },
    type:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    //timestamps : true,
    ImageUrls : [],
    currentBookings :[]
})

const roomModel = Mongoose.model('rooms', roomSchema)

module.exports = roomModel

