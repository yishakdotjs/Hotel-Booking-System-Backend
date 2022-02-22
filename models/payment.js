const Mongoose = require('mongoose')


const paymentSchema = new Mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    paymentCode:{
        type: String,
        required: true,
        unique:true
    },
    amount:{
        type: String,
        required: true
    },
    isTotallyPayed:{
        type: Boolean,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("payments", paymentSchema)