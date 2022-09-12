const express = require('express');
const router = express.Router();
const client = require('../client/client');
const { authSchema } = require('../utils/validation_schema');
const { hashPassword, comparePassword } = require('../utils/helpers');

router.post('/create', async (req, res, next) => {
  try {
    // extract key and value from req body
    const { username, password } = req.body;
    const doesExist = await client.get(username);
    if (doesExist) {
      return res
        .status(409)
        .json({ message: 'User already exist', status: false });
    } else if (
      username === '' ||
      (username === null && password === '') ||
      password === null
    ) {
      return res.status(403).json({ message: 'Forbidden', success: false });
    } else {
      const result = await authSchema.validateAsync(req.body);
      const data = await client.set(username, hashPassword(result.password));
      return res.json({ message: 'successful', success: true, data: data });
    }
  } catch (err) {
    res.json({ status: false, message: 'failed!' });
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    // extract key and value from req body
    const { username, password } = req.body;
    const userPassword = await client.get(username);
    if (userPassword && comparePassword(password, userPassword)) {
      // compare the body.password with userPassword
      return res.status(200).send('Authenticated!');
    }
    return res.status(401).send('Unauthorized!');
  } catch (err) {
    res.status(503).send('Error validating user credentials');
    next(err);
  }
});

router.post('/refresh-token', async (req, res, next) => {
  res.send('refresh token route');
});
router.post('/logout', async (req, res, next) => {
  res.send('logout route');
});

module.exports = router;
