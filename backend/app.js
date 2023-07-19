require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { bdUrl, PORT } = require('./config');

const errorHandler = require('./errors/errorHandler');
const router = require('./routes');

mongoose.connect(bdUrl);

const app = express();

// app.use('/api', require('../router'));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен, PORT = ${PORT}`);
});
