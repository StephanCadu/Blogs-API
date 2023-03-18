const express = require('express');
const validateJWT = require('../auth/validateJWT');
const { validateCategory } = require('../middlewares');
const { categoryController } = require('../controllers');

const router = express.Router();

router.post('/', validateJWT, validateCategory, categoryController.createCategory);

router.get('/', validateJWT, categoryController.getCategories);

module.exports = router;