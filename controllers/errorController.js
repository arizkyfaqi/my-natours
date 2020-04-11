const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  //Oprational, trusted error: send message to client
  if (err.isOprational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

    //Programming or other unknow error: don't lak error details
  } else {
    //1) Log error
    console.error('ERROR : ', err);

    //2) Send generit message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  //log the error
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
