import { Request, Response, Router } from "express";

const app = Router();

app.get('/health', (_req: Request, res: Response) => {
  res.send('healthy');
});

export default app;