const Joi = require('@hapi/joi');

const authSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
});

module.exports = {
  authSchema,
};
