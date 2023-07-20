const allowedCors = [
  'https://katyaslanidi.mesto.nomoredomains.xyz/',
  'http://katyaslanidi.mesto.nomoredomains.xyz/',
  'https://api.katyaslanidi.mesto.nomoredomains.xyz/',
  'http://api.katyaslanidi.mesto.nomoredomains.xyz/',
  'https://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://localhost:3001/',
  'http://localhost:3001/'
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};