import { Request, Response } from "express";
import { StudentRepository } from "../repositories/student-repository";
import { TeacherRepository } from "../repositories/teacher-repository";
import { RegisterRepository } from "../repositories/register-repository";

export class MainController {
  private teacherRepository = new TeacherRepository();
  private studentRepository = new StudentRepository();
  private registerRepository = new RegisterRepository();

  async registerStudent(
    req: Request<{ teacher: string; students: string[] }>,
    res: Response
  ) {
    const { teacher, students } = req.body;
    const teacherEntity = await this.teacherRepository.createIfNotExist(
      teacher
    );
    const studentEntities = await this.studentRepository.createIfNotExist(
      students
    );
    await this.registerRepository.create(teacherEntity, studentEntities);

    return res.status(204).json({ message: "success" });
  }

  async getCommonStudents(req: Request, res: Response) {}

  async suspendStudent(req: Request, res: Response) {}

  async retriveForNotifications(req: Request, res: Response) {}
}
