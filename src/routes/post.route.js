const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPost,
  updatePost,
  getPost,
  deletePost,
  getByUserId,
} = require('../controllers/post.controller');

router.get('/', getAllPost);
router.get('/:id', getPost);
router.get('/user/:id', getByUserId);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
