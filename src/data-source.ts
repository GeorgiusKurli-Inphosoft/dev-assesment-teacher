import { Student } from "src/entites/student";
import { Teacher } from "src/entites/teacher";
import { DataSource } from "typeorm";

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
