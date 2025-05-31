import express from 'express';

const app = express();

app.use(express.json());

// Routes
app.use('/', (req, res): any => {
  return res.send('Hello');
});

// Global error handler (should be after routes)

export default app;
