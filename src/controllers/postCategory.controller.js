const { postCategoryService } = require('../services');

const createPostCategories = async (req, res) => {
  const { data: { email } } = req.user;
  const post = req.body;

  const newPost = await postCategoryService.createPostCategories(post, email);
  return res.status(201).json(newPost);
};

module.exports = {
  createPostCategories,
};