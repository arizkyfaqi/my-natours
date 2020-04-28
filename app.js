const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// 1) Global Middleware
// 3rd-party Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!'
});
app.use('/api', limiter);

app.use(express.json());
//access static files
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello From the middleware :)');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

//2) Routs Handler

//3) Routs
// app.use(app.router);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// app.use(app.router);
// tourRouter.initialize(app);
// userRouter.initialize(app);

//Error Handle : routs not define
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middlware
app.use(globalErrorHandler);

//Export app
module.exports = app;
