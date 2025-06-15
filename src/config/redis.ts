import { createClient } from 'redis';
import config from './config';

const redisClient = createClient({
    username: config.redisUserName,
    password: config.redisPassword,
    socket: {
        host: config.redisEnpoint,
        port: config.redisPort
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis connected')
    } catch (error) {
        console.error('cannot connect redis!!!')
    }
}

export default redisClient;
