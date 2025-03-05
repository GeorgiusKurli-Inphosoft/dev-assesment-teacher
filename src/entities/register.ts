import { mysqlTable, unique, varchar } from "drizzle-orm/mysql-core";
import { student } from "./student";
import { teacher } from "./teacher";
import { randomUUID } from "crypto";

export const register = mysqlTable(
  "register",
  {
    id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
    studentId: varchar("name", { length: 36 })
      .notNull()
      .references(() => student.id),
    teacherId: varchar("email", { length: 36 })
      .notNull()
      .references(() => teacher.id),
  },
  (t) => [unique("unique_map").on(t.studentId, t.teacherId)]
);

export type RegisterEntityType = typeof register.$inferInsert;
