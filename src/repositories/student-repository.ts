import { MySql2Database } from "drizzle-orm/mysql2";
import { StudentStatus } from "../enums/student-status.enum";
import { CustomError } from "../middleware/error-middleware";
import { student, StudentEntityType } from "../entities";
import { eq, inArray } from "drizzle-orm";

export class StudentRepository {
  private db: MySql2Database;
  constructor(db: MySql2Database) {
    this.db = db;
  }
  async findByEmails(emails: string[]): Promise<StudentEntityType[]> {
    return this.db.select().from(student).where(inArray(student.email, emails));
  }

  async findByIds(id: string[]): Promise<StudentEntityType[]> {
    return this.db.select().from(student).where(inArray(student.id, id));
  }

  async suspendByEmail(email: string): Promise<StudentEntityType> {
    const [studentToSuspend] = await this.db
      .select()
      .from(student)
      .where(eq(student.email, email))
      .limit(1);
    if (!studentToSuspend) {
      throw new CustomError("Student email not found", 404);
    }
    await this.db
      .update(student)
      .set({ status: StudentStatus.Suspended.toString() } as typeof student.$inferSelect)
      .where(eq(student.id, studentToSuspend.id));

    const [updatedStudent] = await this.db
      .select()
      .from(student)
      .where(eq(student.email, email))
      .limit(1);

    return updatedStudent;
  }

  async createIfNotExist(emails: string[]): Promise<StudentEntityType[]> {
    const existingStudents = await this.db
      .select()
      .from(student)
      .where(inArray(student.email, emails));
    const existingEmails = existingStudents.map((student) => student.email);

    const newStudents = emails
      .filter((x) => !existingEmails.includes(x))
      .map((email) => {
        return { email, status: StudentStatus.Active };
      });

    if (newStudents.length > 0) {
      await this.db.insert(student).values(newStudents);
    }

    return this.db.select().from(student).where(inArray(student.email, emails));
  }
}
