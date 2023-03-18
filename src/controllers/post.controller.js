const { postService } = require('../services');

const getPosts = async (_req, res) => {
  const posts = await postService.getPosts();
  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await postService.getPostById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });

  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  const newPost = await postService.updatePost(post, id);

  return res.status(200).json(newPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  await postService.deletePost(id);

  return res.sendStatus(204);
};

const searchPosts = async (req, res) => {
  const { q } = req.query;

  const posts = await postService.searchPosts(q);

  return res.status(200).json(posts);
};

module.exports = {
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
};