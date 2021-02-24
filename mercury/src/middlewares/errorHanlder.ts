import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  __: Request,
  res: Response,
  _: NextFunction
) => {
  return res.status(400).json({ message: err.message });
};
