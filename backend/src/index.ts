import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import news from './routers/news-router.js';
import health from './routers/health-router.js';

dotenv.config();

const app = express();
const port = process.env["PORT"];

app.use(cors({
  origin: 'https://worldwidenews24.netlify.app'
}));

app.use(news);
app.use(health);

if (process.env['NODE_ENV'] !== 'test') {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

export default app;