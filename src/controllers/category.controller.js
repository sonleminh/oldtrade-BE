const Category = require('../models/category.model');

const getAllCategory = async (req, res) => {
  try {
    const categoryList = await Category.find({});
    res.json(categoryList);
  } catch (error) {
    throw new Error('Not Found List User');
  }
};

// const getCategory = async (req, res) => {
//   const categorySlug = req.params.id;
//   try {
//     const category = await Category.findOne({ slug: categorySlug });
//     return res.status(200).json(category);
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };

const getPostByCategory = async (req, res) => {
  const categorySlug = req.params.id;
  let postByCategory;
  try {
    postByCategory = await Category.findOne({ slug: categorySlug })
      .sort({
        _id: -1,
      })
      .populate('postList');
    if (!postByCategory) {
      return res.status(404).json({ message: 'No post found !' });
    }
    return res.status(200).json({ post: postByCategory });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    let categoryExisted = await Category.findOne({ name });
    if (categoryExisted) {
      return res
        .status(400)
        .json({ message: 'This category name already exists' });
    }
    const newCategory = new Category({
      name,
      slug,
      postList: [],
    });

    await newCategory.save();
    res.status(200).json({
      category: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  getAllCategory,
  getPostByCategory,
  createCategory,
};
