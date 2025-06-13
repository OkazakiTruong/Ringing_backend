import express from 'express';
import router from './routes';
import globalErrorHandler from './utils/globalErrorHandler.util';
import AppError from './utils/appError.util';
const app = express();

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
