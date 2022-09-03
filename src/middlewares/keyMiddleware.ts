import { Request, Response, NextFunction } from "express";

async function keyMiddleware(req: Request, res: Response, next: NextFunction) {
  const headers = req.headers;
  const apiKey = headers["x-api-key"]?.toString();

  if (!apiKey) {
    res.status(401).send("Access denied. No x-api-key provided.");
    return;
  }

  res.locals = { apiKey: apiKey };

  next();
}

export default keyMiddleware;
