import { Student } from "../entites/student";
import { AppDataSource } from "../data-source";

export class StudentRepository {
  private studentRepository = AppDataSource.getRepository(Student);

  async findByEmails(emails: string[]): Promise<Student[]> {
    return this.studentRepository
      .createQueryBuilder("student")
      .where("email IN(:...emails)", { emails })
      .getMany();
  }

  async create(email: string): Promise<Student> {
    const student = new Student();
    student.email = email;
    return this.studentRepository.save(student);
  }
}
