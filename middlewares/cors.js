// const allowedCors = [
//   'localhost:3000',
//   'http://localhost:3001',
//   'https://localhost:3001',
//   'http://localhost:3005',
//   'https://localhost:3005',
//   'http://api.diplom-kuskova.nomoredomains.rocks',
//   'https://api.diplom-kuskova.nomoredomains.rocks',
//   'http://diplom-kuskova.nomoredomains.rocks',
//   'https://diplom-kuskova.nomoredomains.rocks',
// ];

// module.exports = (req, res, next) => {
//   // Сохраняем источник запроса в переменную origin
//   const { origin } = req.headers;
//   // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
//   const { method } = req;
//   const requestHeaders = req.headers['access-control-request-headers'];
//   // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   // проверяем, что источник запроса есть среди разрешённых
//   if (allowedCors.includes(origin)) {
//     // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   // Если это предварительный запрос, добавляем нужные заголовки
//   if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     // разрешаем кросс-доменные запросы с этими заголовками
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     // завершаем обработку запроса и возвращаем результат клиенту
//     return res.end();
//   }

//   return next();
// };
module.exports = (req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // Set the Access-Control-Allow-Origin header to allow all origins
  res.header('Access-Control-Allow-Origin', '*');

  if (method === 'OPTIONS') {
    // Allow all types of cross-origin requests (by default)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // Allow cross-origin requests with these headers
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // End the request processing and return the result to the client
    return res.end();
  }

  return next();
};