const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Roles = require('./role');

const PermissionSchema = new Schema({
    permit_to:{
        type:Schema.Types.ObjectId,
        ref:'Roles'
    },
    permission_title:{
        type:String
    },
    modules:{
        type:String
    },
    description:{
        type:String
    }
});

const Permission = mongoose.model('bookings', PermissionSchema);
module.exports = Permission;