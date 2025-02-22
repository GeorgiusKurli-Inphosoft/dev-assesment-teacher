import { Request, Response } from "express";
import { StudentRepository } from "../repositories/student-repository";
import { TeacherRepository } from "../repositories/teacher-repository";
import { RegisterRepository } from "../repositories/register-repository";
import { CustomError } from "../middleware/error-middleware";

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

  async getCommonStudents(req: Request, res: Response) {
    const { teacher } = req.query;
    const teacherArray: string[] = Array.isArray(teacher)
      ? (teacher as string[])
      : teacher
      ? [teacher as string]
      : [];
    const teacherEntities = await this.teacherRepository.findByEmails(
      teacherArray
    );

    if (!teacherEntities?.length) {
      throw new CustomError("No valid teachers found", 500);
    }
    const studentIds = await this.registerRepository.getCommonStudentsByTeacher(
      teacherEntities.map((x) => x.id)
    );

    const studentEntities = await this.studentRepository.findByIds(studentIds);

    const studentEmails = studentEntities.map((x) => x.email);
    return res
      .status(200)
      .send({ message: "success", students: studentEmails });
  }

  async suspendStudent(req: Request, res: Response) {}

  async retriveForNotifications(req: Request, res: Response) {}
}
