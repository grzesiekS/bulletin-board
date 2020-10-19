const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

router.get('/userAdmin', async (req, res) => {
  try {
    const result = await User.findOne({ permission: {$eq: 'admin'} });
    if(!result) res.status(404).json({ post: 'Not found'});
    else res.json(result);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
