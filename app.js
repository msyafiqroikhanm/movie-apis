const express = require('express');
const app = express();
const errorHandling = require('./helpers/errorHandling.helper');
const routes = require('./routes');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(
  morgan('common', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' }),
  }),
);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(routes);
app.use(errorHandling);

module.exports = app;
