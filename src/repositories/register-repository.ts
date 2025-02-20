import { Teacher } from "../entites/teacher";
import { Student } from "../entites/student";
import { AppDataSource } from "../data-source";
import { Register } from "../entites/register";

export class RegisterRepository {
  private registerRepository = AppDataSource.getRepository(Register);

  async create(teacher: Teacher, students: Student[]) {
    const studentIds = students.map((student) => student.id);

    const registers = await this.registerRepository
      .createQueryBuilder("register")
      .where("student_id IN(:...studentIds)", { studentIds })
      .andWhere("teacher_id = :teacherId", { teacherId: teacher.id })
      .getMany();

    const existingStudentRegister = registers.map((x) => x.studentId);

    const newRegisters = studentIds
      .filter((x) => !existingStudentRegister.includes(x))
      .map((studentId) => {
        return { teacherId: teacher.id, studentId };
      });

    if (newRegisters.length > 0) {
      this.registerRepository.insert(newRegisters);
    }
  }
}
