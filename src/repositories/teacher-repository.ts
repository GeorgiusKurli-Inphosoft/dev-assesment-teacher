import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Teacher } from "../entites/teacher";

export class TeacherRepository {
  private teacherRepository = AppDataSource.getRepository(Teacher);
  constructor() {}

  async findByEmails(emails: string[]): Promise<Teacher[]> {
    return this.teacherRepository.findBy({ email: In(emails) });
  }

  async createIfNotExist(email: string): Promise<Teacher> {
    let teacher = await this.teacherRepository.findOneBy({ email });
    if (!teacher) {
      teacher = this.teacherRepository.create({
        email,
      });
      teacher = await this.teacherRepository.save(teacher);
    }
    return teacher;
  }
}
