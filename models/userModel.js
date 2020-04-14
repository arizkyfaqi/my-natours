const mongoose = require('mongoose');

//name, email, photo, password, passwordChonfirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email!']
  },
  photo: String,
  password: {
    type: String,
    require: [true, 'Please provide a password!'],
    minlength: 8
  },
  passwordChonfirm: {
    type: String,
    require: [true, 'Please confrim your password!']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
