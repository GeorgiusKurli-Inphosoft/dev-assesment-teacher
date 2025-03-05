import { drizzle } from "drizzle-orm/mysql2";

export const db = drizzle("mysql://user:password@localhost:3306/testdb");
