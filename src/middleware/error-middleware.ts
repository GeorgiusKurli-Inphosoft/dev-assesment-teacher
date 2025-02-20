import { Request, Response, NextFunction } from "express";

// src/utils/CustomError.ts
export class CustomError extends Error {
  public status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(500).send({ errors: [{ message: err.message }] });
  }

  // Handle unexpected errors
  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
