const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

//Schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tours must have name!'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour must have less or equal 40 characters'],
      minlength: [10, 'A tour must have more or equal 10 characters']
      // validate: validator.isAlpha
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
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, and difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'A rating must have above 1.0'],
      max: [5, 'A rating must have below 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tours must have price!']
    },
    priceDiscount: {
      type: Number,
      validate: {
        // validator will return boolean
        //this only points to current on New Document creation
        validator: function(val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
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
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

//DOCUMENT MIDDLEWARE: run before .save() and create() | from mongoose
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function(next) {
//   console.log('Will save document');
//   next();
// });

// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

//QUERY MIDDLEWARE | from MongoDB
// tourSchema.pre('find', function(next) {
// using regular expresion execute find(), findOne(), and another else with find
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Our QUERY took ${Date.now() - this.start} milliseconds!`);
  // console.log(docs);
  next();
});

//AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

//model
const Tour = mongoose.model('Tours', tourSchema);
module.exports = Tour;
