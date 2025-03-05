import { Request, Response } from "express";
import { StudentRepository } from "../repositories/student-repository";
import { TeacherRepository } from "../repositories/teacher-repository";
import { RegisterRepository } from "../repositories/register-repository";
import { CustomError } from "../middleware/error-middleware";
import { StudentStatus } from "../enums/student-status.enum";
import { db } from "../db";

export class MainController {
  private teacherRepository = new TeacherRepository(db);
  private studentRepository = new StudentRepository(db);
  private registerRepository = new RegisterRepository(db);
  private emailRegex = /@([\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,})/g;

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
    await this.registerRepository.create(
      teacherEntity.id,
      studentEntities.map((x) => x.id)
    );

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
      throw new CustomError("No valid teachers found", 404);
    }
    const studentIds = await this.registerRepository.getCommonStudentsByTeacher(
      teacherEntities.map((x) => x.id)
    );

    const studentEntities = await this.studentRepository.findByIds(studentIds);

    const studentEmails = studentEntities.map((x) => x.email);
    return res.status(200).send({ students: studentEmails });
  }

  async suspendStudent(req: Request, res: Response) {
    const { student } = req.body;
    await this.studentRepository.suspendByEmail(student);
    return res.status(204).json({ message: "success" });
  }

  async retrieveForNotifications(req: Request, res: Response) {
    let recipients: string[] = [];
    const { teacher, notification } = req.body;
    const emails = (notification as string)
      .match(this.emailRegex)
      .map((x) => x.slice(1));

    const teacherEntity = await this.teacherRepository.findByEmail(teacher);
    if (!teacherEntity) {
      throw new CustomError("Teacher not found", 404);
    }

    if (emails?.length) {
      const students = await this.studentRepository.findByEmails(emails);
      recipients = students
        .filter((x) => x.status == StudentStatus.Active)
        .map((x) => x.email);
    }

    const studentIdsUnderTeacher =
      await this.registerRepository.getCommonStudentsByTeacher([
        teacherEntity.id,
      ]);
    const studentsUnderTeacher = await this.studentRepository.findByIds(
      studentIdsUnderTeacher
    );
    recipients = recipients.concat(
      studentsUnderTeacher
        .filter((x) => x.status == StudentStatus.Active)
        .map((x) => x.email)
    );

    return res.status(200).send({ recipients });
  }
}
