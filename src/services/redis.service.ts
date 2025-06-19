import redisClient from '../config/redis';

class RedisServices {
  async setData(key: string, value: any, expire: number = 60) {
    await Promise.all([
      redisClient.hSet(key, value),
      redisClient.expire(key, expire),
    ]);
  }

  async getData(key: string) {
    let dataSection = await redisClient.hGetAll(key);
    return dataSection;
  }
}

const redisService = new RedisServices();
export default redisService;
