const { PORT = 3001 } = process.env;
// const bdUrl = 'mongodb://localhost:27017/mestodb';
const bdUrl = 'mongodb://0.0.0.0:27017/';
const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

module.exports = { bdUrl, PORT, urlRegex };