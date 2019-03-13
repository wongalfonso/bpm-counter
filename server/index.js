const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env !== 'develpment') {
  app.use(morgan());
} else {
  app.use(morgan('dev'));
}
app.use(express.static('public'));
app.use(express.static('dist'));

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
