import { Request } from "express";

const newsApiBase = 'https://newsapi.org/v2';

const indexParams: Map<string, string> = new Map([
  ['search', 'q'],
  ['from', 'from'],
  ['to', 'to'],
  ['sort', 'sortBy']
]);


export function buildIndexRequest(queryParams: Request['query']): URL {
  const token = process.env["Token"];

  if (!token) {
    throw new Error("Cannot find news api token");
  }

  const url = new URL(`${newsApiBase}/everything`);

  for(const [key, value] of indexParams) {
    const paramValue = queryParams[key];

    if (!paramValue|| typeof paramValue !== 'string') {
      continue;
    }

    url.searchParams.set(value, paramValue);
  }

  url.searchParams.set('token', token);

  return url;
}
