import { Router } from "express";
import * as news from '../controllers/news-controller.js';

const app = Router();

app.get('/', news.index);

export default app;