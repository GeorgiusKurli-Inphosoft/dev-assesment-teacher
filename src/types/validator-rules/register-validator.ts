import { body, ValidationChain } from "express-validator";

export const registerValidatorRules: ValidationChain[] = [
  body("teacher")
    .isString()
    .withMessage("Teacher must be a string")
    .notEmpty()
    .withMessage("Teacher email is required"),
  body("students")
    .isArray({ min: 1 })
    .withMessage("Students must be an array and it must not be empty"),
  body("students.*")
    .isString()
    .withMessage("Each student must be a string")
    .notEmpty()
    .withMessage("Student email is required"),
];
