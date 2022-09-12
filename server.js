const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const AuthRoute = require('./Routes/auth.Route');

const PORT = process.env.PORT || 6000;

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/auth', AuthRoute);

app.listen(6000, () => {
  console.log(`App listening on port! ${PORT}`);
});
