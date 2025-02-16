import { Student } from "src/entites/student";
import { AppDataSource } from "../data-source";
import { Teacher } from "../entites/teacher";

export class teacherRepository {
  private teacherRepository = AppDataSource.getRepository(Teacher);

  async findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find();
  }

  async create(email: string): Promise<Teacher> {
    const teacher = new Teacher();
    teacher.email = email;
    return this.teacherRepository.save(teacher);
  }
}
