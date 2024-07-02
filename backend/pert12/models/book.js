//import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//buat skema untuk embedded collection
const reviewSchema = new Schema({
  user: String,
  rating: Number,
  comment: String
}, { _id: false });

//buat pula parent collection dengan 
const bookSchema = new Schema({
  title: String,
  author: String,
  reviews: [reviewSchema]
});

module.exports = mongoose.model('Book', bookSchema);