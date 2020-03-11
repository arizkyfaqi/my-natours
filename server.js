const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connections successful!');
  });

//Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tours must have name!'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tours must have price!']
  }
});

//model
const Tours = mongoose.model('Tours', tourSchema);

//Insert data
const testTour = new Tours({
  name: 'The Park Camper',
  price: 340
});

testTour
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log('There was Error ', err);
  });

//environment variable
//1. express
// console.log(app.get('env'));
//2. Node JS
// console.log(process.env);

// 4) Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is Running on ${port}..`);
});
