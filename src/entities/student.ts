import { randomUUID } from "crypto";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { StudentStatus } from "../enums/student-status.enum";

export const student = mysqlTable("student", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  email: varchar("email", { length: 255 }).notNull().unique(),
  status: varchar("status", { length: 255 })
    .notNull()
    .default(StudentStatus.Active.toString()),
});

export type StudentEntityType = typeof student.$inferSelect;
