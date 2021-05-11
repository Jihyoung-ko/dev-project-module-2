const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    // todo check if is email
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: [true, 'password is required'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;