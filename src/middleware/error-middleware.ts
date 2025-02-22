import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  public status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("zaq", err);
  if (err instanceof CustomError) {
    res.status(err.status).send({ errors: [{ message: err.message }] });
  }

  // Handle unexpected errors

  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
  // next();
};
