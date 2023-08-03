import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import news from './routers/news-router.js';

dotenv.config();

const app = express();
const port = process.env["PORT"];

app.use(cors({
  origin: 'https://worldwidenews24.netlify.app'
}));

app.use(news);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
