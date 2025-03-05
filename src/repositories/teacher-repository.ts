import { MySql2Database } from "drizzle-orm/mysql2";
import { teacher, TeacherEntityType } from "../entities";
import { eq, inArray } from "drizzle-orm";

export class TeacherRepository {
  private db: MySql2Database;
  constructor(db: MySql2Database) {
    this.db = db;
  }
  async findByEmail(email: string): Promise<TeacherEntityType> {
    const [teacherFound] = await this.db
      .select()
      .from(teacher)
      .where(eq(teacher.email, email))
      .limit(1);
      return teacherFound;
  }

  async findByEmails(emails: string[]): Promise<TeacherEntityType[]> {
    return this.db.select().from(teacher).where(inArray(teacher.email, emails));
  }

  async createIfNotExist(email: string): Promise<TeacherEntityType> {
    let teacherEntity = await this.findByEmail(email);
    if (!teacherEntity) {
      await this.db
      .insert(teacher)
      .values({ email });

      teacherEntity = await this.findByEmail(email);
    }
    return teacherEntity;
  }
}
