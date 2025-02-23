import { Student } from "../entites/student";
import { StudentStatus } from "../enums/student-status.enum";
import { DataSource, In, Repository } from "typeorm";
import { CustomError } from "../middleware/error-middleware";

export class StudentRepository {
  private studentRepository: Repository<Student>;
  constructor(dataSource: DataSource) {
    this.studentRepository = dataSource.getRepository(Student);
  }
  async findByEmails(emails: string[]): Promise<Student[]> {
    return this.studentRepository
      .createQueryBuilder("student")
      .where("email IN(:...emails)", { emails })
      .getMany();
  }

  async findByIds(id: string[]): Promise<Student[]> {
    return this.studentRepository.findBy({ id: In(id) });
  }

  async suspendByEmail(email: string): Promise<Student> {
    const student = await this.studentRepository.findOneBy({ email });
    if (!student) {
      throw new CustomError("Student email not found", 404);
    }
    await this.studentRepository.update(student.id, {
      status: StudentStatus.Suspended,
    });
    return this.studentRepository.findOneBy({ email });
  }

  async createIfNotExist(emails: string[]): Promise<Student[]> {
    const existingStudents = await this.studentRepository
      .createQueryBuilder("student")
      .where("email IN(:...emails)", { emails })
      .getMany();
    const existingEmails = existingStudents.map((student) => student.email);

    const newStudents = emails
      .filter((x) => !existingEmails.includes(x))
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
