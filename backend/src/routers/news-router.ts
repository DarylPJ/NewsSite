import { Router } from "express";
import * as newsController from '../controllers/news-controller.js';

const app = Router();

app.get('/', newsController.index);

export default app;