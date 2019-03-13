const express = require('express');
const morgan = require('morgan');

const app = express();

if (process.env !== 'develpment') {
  app.use(morgan());
} else {
  app.use(morgan('dev'));
}
app.use(express.static('public'));

