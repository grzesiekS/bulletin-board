const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  uploadDate: {type: String, required: true},
  updateDate: {type: String, required: true},
  userId: {type: String, required: true},
  statusId: {type: String, required: true},
  price: {type: Number, required: true},
});

module.exports = mongoose.model('Post', postSchema);
