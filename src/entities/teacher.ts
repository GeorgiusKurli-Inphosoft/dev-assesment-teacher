import { randomUUID } from "crypto";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const teacher = mysqlTable("teacher", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  email: varchar("email",{ length: 255 }).notNull().unique(),
});

export type TeacherEntityType = typeof teacher.$inferSelect;
