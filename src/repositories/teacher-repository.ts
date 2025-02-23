import { DataSource, In, Repository } from "typeorm";
import { Teacher } from "../entites/teacher";

export class TeacherRepository {
  private teacherRepository: Repository<Teacher>;
  constructor(dataSource: DataSource) {
    this.teacherRepository = dataSource.getRepository(Teacher);
  }
  async findByEmail(email: string): Promise<Teacher> {
    return this.teacherRepository.findOneBy({ email });
  }

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
