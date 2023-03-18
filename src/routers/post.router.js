const express = require('express');
const validateJWT = require('../auth/validateJWT');
const validatePermission = require('../auth/validatePermission');
const { validatePost, validateEditPost } = require('../middlewares');
const { postCategoryController, postController } = require('../controllers');

const router = express.Router();

router.post('/', validateJWT, validatePost, postCategoryController.createPostCategories);

router.get('/search', validateJWT, postController.searchPosts);

router.get('/', validateJWT, postController.getPosts);

router.get('/:id', validateJWT, postController.getPostById);

router.put('/:id', validateJWT, validatePermission, validateEditPost, postController.updatePost);

router.delete('/:id', validateJWT, validatePermission, postController.deletePost);

module.exports = router;