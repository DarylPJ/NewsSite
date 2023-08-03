import { Request, Response } from "express";
import { buildIndexRequest } from '../news-url-builder.js';
import newsIndex from "../mock-data.js";

export async function index(req: Request, res: Response): Promise<void> {
  const url = buildIndexRequest(req.query);
  console.log(`Built URL: ${url.toString()}`);

  // newsapi key generation broken.

  // try {
  //   const result = await fetch(url);
  //   const data = await result.json();
  // } catch {
  //   res.status(504).send("Error connecting to required external services.");
  // }

  const results = newsIndex(url);

  res.json(results);
};