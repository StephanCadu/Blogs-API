const { userService, postService } = require('../services');

module.exports = async (req, res, next) => {
  const { data: { email } } = req.user;
  const { id } = req.params;

  const user = await userService.getUserByEmail(email);
  const post = await postService.getPostById(id);

  if (!post) return res.status(404).json({ message: 'Post does not exist' });

  if (user.id !== post.userId) return res.status(401).json({ message: 'Unauthorized user' });

  next();
};