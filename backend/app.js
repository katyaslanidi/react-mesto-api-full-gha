require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { PORT = 3000 } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { bdUrl } = require('./config');

const errorHandler = require('./errors/errorHandler');
const router = require('./routes');

mongoose.connect(bdUrl);

const app = express();

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
