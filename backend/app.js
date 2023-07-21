require('dotenv').config();

const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_URL, PORT } = require('./config');
const cors = require('./middlewares/cors');
const errorHandler = require('./errors/errorHandler');
const router = require('./routes');

const app = express();

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((err) => console.log('Ошибка подключение:', err));

// app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен, PORT = ${PORT}`);
});
