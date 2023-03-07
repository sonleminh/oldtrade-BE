const express = require('express');
const {
  getAllCategory,
  getPostByCategory,
  createCategory,
} = require('../controllers/category.controller');
const router = express.Router();

router.get('/', getAllCategory);

router.get('/:id', getPostByCategory);

router.post('/', createCategory);

module.exports = router;
