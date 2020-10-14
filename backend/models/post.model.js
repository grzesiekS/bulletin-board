const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  uploadDate: {type: String, required: true},
  updateDate: {type: String, required: true},
  user: {type: String, required: true, ref: 'User'},
  status: {type: String, required: true, ref: 'Status'},
  price: {type: Number, required: true},
});

module.exports = mongoose.model('Post', postSchema);
