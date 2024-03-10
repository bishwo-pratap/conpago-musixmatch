const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    REDIS_HOST: Joi.string().required().description('Redis Host is required'),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_EXPIRY_TIME: Joi.number().default(300),
    REDIS_DB: Joi.number().required(),
    MM_API_URL: Joi.string().required().description('MusixMatch API base url'),
    MM_API_KEY: Joi.string().required().description('MusixMatch API key'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  },
  redis:{
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    ttl: envVars.REDIS_EXPIRY_TIME,
    db: envVars.REDIS_DB,
  },
  mm_api: {
    url: envVars.MM_API_URL,
    key: envVars.MM_API_KEY
  }
};