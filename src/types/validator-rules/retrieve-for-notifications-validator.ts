import { body } from "express-validator";

export const retrieveForNotificationsValidator = [
  body("teacher")
    .isString()
    .withMessage("Teacher must be a string")
    .notEmpty()
    .withMessage("Teacher email is required"),
  body("notification")
    .isString()
    .withMessage("Notification must be a string")
    .notEmpty()
    .withMessage("Notification is required"),
];

