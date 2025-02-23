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
  // catch custom error thrown
  if (err instanceof CustomError) {
    res.status(err.status).send({ message: err.message });
  } else {
    // default error msg
    res.status(500).send({ message: "Something went wrong" });
  }
};
