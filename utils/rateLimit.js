const rateLimit = require('express-rate-limit');
//  Чтобы защититься от множества автоматических запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

module.exports = limiter;
