import { DataSource } from "typeorm";
import { Student } from "./entites/student";
import { Teacher } from "./entites/teacher";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "testdb",
  synchronize: false,
  logging: true,
  entities: [Student, Teacher],
  migrations: ["src/migrations/**/*.ts"],
});
