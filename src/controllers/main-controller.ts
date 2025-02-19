import { Request, Response } from "express";
import { StudentRepository } from "../repositories/student-repository";
import { TeacherRepository } from "../repositories/teacher-repository";
import { RegisterRepository } from "../repositories/register-repository";

export class MainController {
  private teacherRepository = new TeacherRepository();
  private studentRepository = new StudentRepository();
  private registerRepository = new RegisterRepository();

  async registerStudent(req: Request, res: Response) {
    const teacher = await this.teacherRepository.findByEmail(
      req.param["teacher"]
    );
    if (teacher) {
      const students = await this.studentRepository.findByEmails(
        req.param["students"]
      );
      students.forEach((student) => {
        this.registerRepository.create(student.id, teacher.id);
      });
    }

    res.send();
  }

  async getCommonStudents(req: Request, res: Response) {}

  async suspendStudent(req: Request, res: Response) {}

  async retriveForNotifications(req: Request, res: Response) {}
}
