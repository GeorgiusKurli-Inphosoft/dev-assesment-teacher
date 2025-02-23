import { body } from "express-validator";

export const suspendValidator = () =>
  body("student")
    .isString()
    .withMessage("Student must be a string")
    .notEmpty()
    .withMessage("Student email is required");
