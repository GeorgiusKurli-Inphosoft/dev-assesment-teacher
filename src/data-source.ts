import { DataSource } from "typeorm";

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
  entities: ['src/entities/**/*{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}']
});

