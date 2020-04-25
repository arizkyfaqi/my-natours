const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsyc');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.postUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    massage: 'This rout is not yet defined!'
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfrim) {
    return next(
      new AppError(
        'This rout is not for update password. please use /UpdateMyPassword',
        400
      )
    );
  }

  //2) Filtered out unwanted fields names thet are not allowed to be update
  const filteredBody = filterObj(req.body, 'name', 'email');

  //3) Update user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser
    }
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    massage: 'This rout is not yet defined!'
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    massage: 'This rout is not yet defined!'
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    massage: 'This rout is not yet defined!'
  });
};
