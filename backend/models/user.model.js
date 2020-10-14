const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {type: String, required: true},
  permission: {type: String, required: true},
  email: {type: String, required: true},
  phoneNo: {type: String, required: true},
});

module.exports = mongoose.model('User', userSchema);
