const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  avatar: String,
  createdBy: String,
});

module.exports = mongoose.model('User', userSchema);
