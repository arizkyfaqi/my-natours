const mongoose = require('mongoose');
const slugify = require('slugify');

//Schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tours must have name!'],
      unique: true,
      trim: true
    },
    slug: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.virtual('durationWeek').get(function() {
  return this.duration / 7;
});

//DOCUMENT MIDDLEWARE: run before .save() and create()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre('save', function(next) {
  console.log('Will save document');
  next();
});

tourSchema.post('save', function(doc, next) {
  console.log(doc);
  next();
});

//model
const Tour = mongoose.model('Tours', tourSchema);
module.exports = Tour;
