const mongoose = require('mongoose');

//Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tours must have name!'],
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a dutarion']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tours must have price!']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cove image']
  },
  images: [String],
  creatAt: {
    type: Date,
    default: Date.now(),
    select: true
  },
  startDates: [Date]
});

//model
const Tour = mongoose.model('Tours', tourSchema);
module.exports = Tour;
