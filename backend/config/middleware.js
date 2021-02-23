module.exports = {
  load: {
    before: ['cookieGetter', 'responseTime', 'logger', 'cors', 'responses', 'gzip'],
    order: [
      "Define the middlewares' load order by putting their name in this array is the right order",
    ],
    after: ['parser', 'router', 'cookieSetter'],
  },
  settings: {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:1337'],
    },
    cookieGetter: {
      enabled: true
    },
    cookieSetter: {
      enabled: true
    }
  },
};