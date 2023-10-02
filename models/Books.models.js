const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    title: String,
    authors: [String],
    description: String,
    publishedDate: String,
    pageCount: Number,
    thumbnailUrl: String,
    infoLink: String,
})

module.exports = mongoose.model("Books", BookSchema);