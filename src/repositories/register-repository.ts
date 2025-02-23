import { Teacher } from "../entites/teacher";
import { Student } from "../entites/student";
import { Register } from "../entites/register";
import { DataSource, Repository } from "typeorm";

export class RegisterRepository {
  private registerRepository: Repository<Register>;
  constructor(dataSource: DataSource) {
    this.registerRepository = dataSource.getRepository(Register);
  }
  async create(teacherId: string, studentIds: string[]) {

    const registers = await this.registerRepository
      .createQueryBuilder("register")
      .where("student_id IN(:...studentIds)", { studentIds })
      .andWhere("teacher_id = :teacherId", { teacherId })
      .getMany();

    const existingStudentRegister = registers.map((x) => x.studentId);

    const newRegisters = studentIds
      .filter((x) => !existingStudentRegister.includes(x))
      .map((studentId) => {
        return { teacherId, studentId };
      });

    if (newRegisters.length > 0) {
      this.registerRepository.insert(newRegisters);
    }

    return newRegisters;
  }

  async getCommonStudentsByTeacher(teacherIds: string[]) {
    const rawStudentIds = await this.registerRepository
      .createQueryBuilder("register")
      .select(["register.student_id"])
      .where("teacher_id in (:...teacherIds)", { teacherIds })
      .groupBy("register.student_id")
      .having("COUNT(DISTINCT register.teacher_id) = :teacherCount", {
        teacherCount: teacherIds.length,
      })
      .getRawMany();
    return rawStudentIds.map((x) => x.student_id);
  }
}
