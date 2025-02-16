import { Request, Response } from "express";
import { studentRepository } from "src/repositories/student-repository";
import { teacherRepository } from "src/repositories/teacher-repository";

export class MainController {
  private teacherRepository = new teacherRepository();
  private studentRepository = new studentRepository();

  async registerStudent(req: Request, res: Response) {}

  async getCommonStudents(req: Request, res: Response) {}

  async suspendStudent(req: Request, res: Response) {}

  async retriveForNotifications(req: Request, res: Response) {}
}
