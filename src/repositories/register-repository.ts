import { inArray, and, eq, sql } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { register, RegisterEntityType } from "../entities";

export class RegisterRepository {
  private db: MySql2Database;
  constructor(db: MySql2Database) {
    this.db = db;
  }
  async create(teacherId: string, studentIds: string[]) {
    const registers = await this.db
      .select()
      .from(register)
      .where(
        and(
          inArray(register.studentId, studentIds),
          eq(register.teacherId, teacherId)
        )
      );

    const existingStudentRegister = registers.map((x) => x.studentId);

    const newRegisters = studentIds
      .filter((x) => !existingStudentRegister.includes(x))
      .map((studentId) => {
        return { teacherId, studentId } as RegisterEntityType;
      });
    if (newRegisters.length > 0) {
      await this.db.insert(register).values(newRegisters);
    }

    return newRegisters;
  }

  async getCommonStudentsByTeacher(teacherIds: string[]) {
    const rawStudentIds = await this.db
      .select({ studentId: register.studentId })
      .from(register)
      .where(inArray(register.teacherId, teacherIds))
      .groupBy(register.studentId)
      .having(
        sql`COUNT(DISTINCT ${register.teacherId}) = ${teacherIds.length}`
      );
    return rawStudentIds.map((x) => x.studentId);
  }
}
