const Sequelize = require('sequelize');
const config = require('../config/config');

const { BlogPost, User, PostCategory } = require('../models');

const env = process.env.NODE_ENV;

const sequelize = new Sequelize(config[env]);

const createPostCategories = async (postInfo, email) => {
  try {
    const { categoryIds, title, content } = postInfo;

    const newPost = await sequelize.transaction(async (t) => {
      const { id: userId } = await User.findOne({ where: { email } }, { transaction: t });

      const post = await BlogPost.create({ userId, title, content }, { transaction: t });

      await post.addCategories(categoryIds)

      // await Promise.all(categoryIds.map(async (categoryId) => PostCategory
      //   .create({ postId: post.id, categoryId }, { transaction: t })));

      return post;
    });

    return newPost;
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};

module.exports = {
  createPostCategories,
};