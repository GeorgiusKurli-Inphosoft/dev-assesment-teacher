import { drizzle } from "drizzle-orm/mysql2";

export const db = drizzle("mysql://testuser:testpassword@localhost:3307/unittestdb");
