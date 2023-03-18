const { categorySchema } = require('./schemas');

module.exports = (req, res, next) => {
  const { name } = req.body;

  const { error } = categorySchema.validate({ name });
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};