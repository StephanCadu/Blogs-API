const { postSchema } = require('./schemas');
const { categoryService } = require('../services');

module.exports = async (req, res, next) => {
  const post = req.body;

  const { error } = postSchema.validate(post);
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const categories = await categoryService.getCategories();

  if (!post.categoryIds.every((id) => categories.some((cat) => cat.id === id))) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};