import { NextFunction, Router } from "express";
import { MainController } from "../controllers/main-controller";

const router = Router();
const mainController = new MainController();

router.post("/register", mainController.registerStudent.bind(mainController));
router.get(
  "/commonstudents",
  mainController.getCommonStudents.bind(mainController)
);
router.post("/suspend", mainController.suspendStudent.bind(mainController));
router.post(
  "/retrievefornotifications",
  mainController.retriveForNotifications.bind(mainController)
);

export default router;
