const {
  PORT = 3001,
  MONGO_URL = 'mongodb://127.0.0.1:27017',
} = process.env;
const DB_URL = `${MONGO_URL}/mestodb`;
const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

module.exports = { DB_URL, PORT, urlRegex };
