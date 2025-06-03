import express from 'express';
import router from './routes';
const app = express();

app.use(express.json());

// Routes
app.use('/ringing-v1', router);

export default app;
