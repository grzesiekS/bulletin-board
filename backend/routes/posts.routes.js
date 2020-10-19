const express = require('express');
const sanitize = require('mongo-sanitize');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    // const result = await Post
    //   .find({status: 'published'})
    //   .select('author created title photo')
    //   .sort({created: -1});
    const result = await Post.find()
      .populate('status').populate('user')
      .select('title description user status')
      .sort({updateDate: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id).populate('status').populate('user');
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => {
  try {
    const componentStateSanitize = sanitize(req.body.componentState);
    const {title, description, status, price, uploadDate, updateDate} = componentStateSanitize;

    const newPost = new Post(
      {
        title: title,
        description: description,
        status: status,
        price: price,
        uploadDate: uploadDate,
        updateDate: updateDate,
      }
    );

    await newPost.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
