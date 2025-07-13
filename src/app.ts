import express from 'express';
import router from './routes';
import globalErrorHandler from './utils/globalErrorHandler.util';
import AppError from './utils/appError.util';
import cors from 'cors';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
} else {
  app.use(
    cors({
      origin: [process.env.CLIENT_URL || 'http://localhost:5173'],
      credentials: true, // Cho phép gửi cookies
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );
}
app.use(express.json());

// Routes
app.use('/ringing-v1', router);

// Handle undefined routes
app.all('/{*any}', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//handle global error
app.use(globalErrorHandler);

export default app;
