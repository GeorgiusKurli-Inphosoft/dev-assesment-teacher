import { DataSource } from "typeorm";
import { Register } from "./entites/register";
import { Student } from "./entites/student";
import { Teacher } from "./entites/teacher";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "user",
  password: "password",
  database: "testdb",
  insecureAuth: true,
  synchronize: false,
  logging: true,
  entities: [Register, Student, Teacher],
  migrations: [`src/migrations/**/*{.ts,.js}`],
});
