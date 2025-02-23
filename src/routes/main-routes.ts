import { Router } from "express";
import { MainController } from "../controllers/main-controller";
import {
  registerValidatorRules,
} from "../types/validator-rules/register-validator";
import { suspendValidator } from "../types/validator-rules/suspend-validator";
import { retrieveForNotificationsValidator } from "../types/validator-rules/retrieve-for-notifications-validator";
import { validateRequest,  } from "../middleware/validator-middleware";

const router = Router();
const mainController = new MainController();

router.post(
  "/register",
  validateRequest(registerValidatorRules),
  mainController.registerStudent.bind(mainController)
);
router.get(
  "/commonstudents",
  mainController.getCommonStudents.bind(mainController)
);
router.post(
  "/suspend",
  suspendValidator(),
  mainController.suspendStudent.bind(mainController)
);
router.post(
  "/retrievefornotifications",
  validateRequest(retrieveForNotificationsValidator),
  mainController.retrieveForNotifications.bind(mainController)
);

export default router;
