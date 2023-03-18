const validateLogin = require('./schemas');

module.exports = (req, res, next) => {
  const login = req.body;
  const { error } = validateLogin.loginSchema.validate(login);
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });
  next();
};