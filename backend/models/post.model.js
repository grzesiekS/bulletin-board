const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {type: String, required: true, minlength: 10},
  description: {type: String, required: true, minlength: 20},
  uploadDate: {type: String, required: true},
  updateDate: {type: String, required: true},
  user: {type: String, required: true, ref: 'User'},
  status: {type: String, required: true, ref: 'Status'},
  price: {type: Number, required: true, min: 0},
});

module.exports = mongoose.model('Post', postSchema);
