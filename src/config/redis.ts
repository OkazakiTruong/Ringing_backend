// redisClient.ts
import { createClient, RedisClientType } from 'redis';
import config from './config';

const redisClient: RedisClientType = createClient({
  username: config.redisUserName,
  password: config.redisPassword,
  socket: {
    host: config.redisEnpoint,
    port: config.redisPort,
  },
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

let isConnected = false;

export const connectRedis = async () => {
  if (!isConnected) {
    try {
      await redisClient.connect();
      isConnected = true;
      console.log('Redis connected');
    } catch (error) {
      console.error('❌ Cannot connect to Redis:', error);
      throw error;
    }
  }
};

export default redisClient;
