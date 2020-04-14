const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//name, email, photo, password, passwordChonfirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email!'],
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  password: {
    type: String,
    require: [true, 'Please provide a password!'],
    minlength: 8
  },
  passwordChonfirm: {
    type: String,
    require: [true, 'Please confrim your password!'],
    validate: {
      //This only works on CREATE and SAVE
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  }
});

//Hashing password
userSchema.pre('save', async function(next) {
  //Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  //hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfrim
  this.passwordChonfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
