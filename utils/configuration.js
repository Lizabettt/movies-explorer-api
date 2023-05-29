const {
  PORT = 3000,
  MONGO_BD = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET,
  NODE_ENV,
} = process.env;

const JWT = NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET';

module.exports = {
  PORT,
  MONGO_BD,
  JWT
};
