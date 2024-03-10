const redis = require('redis');
const config = require('../config/config')
let client = redis.createClient({
  port: config.redis.port, 
  host: config.redis.host,
  database: +config.redis.db
});

(async () => {
  client.on('error', (err) => {
    console.log('Redis Client Error', err);
  });
  client.on('ready', async () => {
    console.log('Redis is ready')
  });
  
  await client.connect();
})();


const setCacheData = async (key, value) => {
  try {
    await client.set(key, JSON.stringify(value), {
      EX: config.redis.ttl,
      NX: true
    }); 
  } catch (error) {
    throw Error('Error setting redis data',error)    
  }
}

const getCacheData = async (key) => {
  try {
    const data = await client.get(key);
    return JSON.parse(data) 
  } catch (error) {
    throw Error('Error getting redis data',error)    
  }
}

module.exports = {
  client,
  setCacheData,
  getCacheData
}
