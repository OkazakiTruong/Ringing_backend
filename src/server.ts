import app from './app';
import config from './config/config';
import { connectDB } from './config/db';
import { connectRedis } from './config/redis';

async function startServer() {
  await connectDB();
  await connectRedis();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}
startServer();
