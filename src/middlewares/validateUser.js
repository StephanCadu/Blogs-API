const { userSchema } = require('./schemas');
const userService = require('../services/user.service');

module.exports = async (req, res, next) => {
  const user = req.body;

  const { error } = userSchema.validate(user);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const userExists = await userService.getUserByEmail(user.email);
  if (userExists) return res.status(409).json({ message: 'User already registered' });

  next();
};