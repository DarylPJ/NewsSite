import { Request, Response, Router } from "express";
import * as healthController from '../controllers/health-controller.js';

const app = Router();

app.get('/health', (_req: Request, res: Response) => {
  const result = healthController.healthCheck();
  res.send(result);
});

export default app;