const mongoose = require('mongoose');
const {Schema} = mongoose;

const usersSchema = new Schema({
    fullName : {type:String, required:true},
    mobileNumber : {type:Number, required:true},
    mail : {type:String, required:true},
    password : {type:String, required:true},
    resetToken : {type:String, upsert:true},
    about : {type:String, upsert:true},
    lastName : {type:String, upsert:true},
    streetAddress : {type:String, upsert:true},
    city : {type:String, upsert:true},
    state : {type:String, upsert:true},
    pinCode : {type:String, upsert:true},
    country : {type:String, upsert:true},
})

module.exports = mongoose.model("users",usersSchema);