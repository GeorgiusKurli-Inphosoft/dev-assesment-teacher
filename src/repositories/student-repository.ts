import { Student } from "../entites/student";
import { AppDataSource } from "../data-source";
import { StudentStatus } from "../enums/student-status.enum";
import { In } from "typeorm";

export class StudentRepository {
  private studentRepository = AppDataSource.getRepository(Student);

  async findByEmails(emails: string[]): Promise<Student[]> {
    return this.studentRepository
      .createQueryBuilder("student")
      .where("email IN(:...emails)", { emails })
      .getMany();
  }

  async createIfNotExist(emails: string[]): Promise<Student[]> {
    const existingStudents = await this.studentRepository
      .createQueryBuilder("student")
      .where("email IN(:...emails)", { emails })
      .getMany();
    const existingEmails = existingStudents.map((student) => student.email);

    const newStudents = emails
      .filter((x) => x in existingEmails)
      .map((email) => {
        return { email, status: StudentStatus.Active };
      });

    if (newStudents.length > 0) {
      await this.studentRepository.insert(newStudents);
    }

    return this.studentRepository.find({
      where: { email: In(emails) },
    });
  }
}
