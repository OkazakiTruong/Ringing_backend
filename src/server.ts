import app from './app';
import config from './config/config';
import { connectDB } from './config/db';
import { connectRedis, disconnectRedis } from './config/redis';
async function startServer() {
  try {
    await connectDB();
    await connectRedis();

    const server = app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });

    // 👇 Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('🛑 SIGINT received. Shutting down gracefully...');
      await disconnectRedis(); // đóng Redis
      server.close(() => {
        console.log('✅ Server closed.');
        process.exit(0);
      });
    });

    process.on('SIGTERM', async () => {
      console.log('🛑 SIGTERM received. Shutting down...');
      await disconnectRedis(); // đóng Redis
      server.close(() => process.exit(0));
    });
  } catch (err) {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  }
}

startServer();
