const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    //need to make user type data type to define user admin and receptionist and others
    role_title:{
        type:String
    },
    role_description:{
        type:String
    }
});

//make a add role controller, method
const Roles = mongoose.model('roles',RoleSchema);
module.exports = Roles;