const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  statusName: {type: String, required: true},
});

module.exports = mongoose.model('Status', statusSchema, 'status');
