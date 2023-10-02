const mongoose = require('mongoose');
const {Schema} = mongoose;

const imageSchema = new Schema({
    name : String,
    image : String
})

module.exports = mongoose.model("images",imageSchema);