import { Student } from "../entites/student";
import { AppDataSource } from "../data-source";

export class studentRepository {
  private studentRepository = AppDataSource.getRepository(Student);

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async create(email: string): Promise<Student> {
    const student = new Student();
    student.email = email;
    return this.studentRepository.save(student);
  }
}
