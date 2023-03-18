const Sequelize = require('sequelize');
const config = require('../config/config');

const { BlogPost, User, Category } = require('../models');

const env = process.env.NODE_ENV;

const sequelize = new Sequelize(config[env]);

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
      },
    ],
  });

  return posts;
};

const getPostById = async (id, transaction = null) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
      },
    ],
  }, { transaction });

  return post;
};

const updatePost = async (post, id) => {
  try {
    const postUpdated = await sequelize.transaction(async (t) => {
      await BlogPost.update(post, { where: { id } }, { transaction: t });

      const newPost = await getPostById(id, { transaction: t });

      return newPost;
    });

    return postUpdated;
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};

const deletePost = async (id) => BlogPost.destroy({ where: { id } });

const searchPosts = async (q) => {
  const posts = await getPosts();

  if (!q) return posts;

  const postsFound = posts.filter(({ title, content }) => title.includes(q)
    || content.includes(q));

  return postsFound;
};

module.exports = {
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
};