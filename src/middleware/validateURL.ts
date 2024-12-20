import { Request, Response, NextFunction } from "express";

export function validateURL(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { originalURL } = req.body;

  try {
    new URL(originalURL);
    next();
  } catch {
    res.status(400).json({ error: "Invalid URL format" });
  }
}
