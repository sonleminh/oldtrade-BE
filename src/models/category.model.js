const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    icon: {
      type: String,
      require: true,
    },
    postList: [{ type: mongoose.Types.ObjectId, ref: 'Post', require: true }],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
