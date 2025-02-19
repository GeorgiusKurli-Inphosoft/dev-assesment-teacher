import { AppDataSource } from "../data-source";
import { Teacher } from "../entites/teacher";

export class TeacherRepository {
  private teacherRepository = AppDataSource.getRepository(Teacher);

  async findByEmail(email: string): Promise<Teacher> {
    return this.teacherRepository.findOneBy({ email });
  }

  async create(email: string): Promise<Teacher> {
    const teacher = new Teacher();
    teacher.email = email;
    return this.teacherRepository.save(teacher);
  }
}
