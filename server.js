const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! * Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

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

//environment variable
//1. express
// console.log(app.get('env'));
//2. Node JS
// console.log(process.env);

// 4) Start Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is Running on ${port}..`);
  console.log('mode : ', process.env.NODE_ENV);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! * Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
