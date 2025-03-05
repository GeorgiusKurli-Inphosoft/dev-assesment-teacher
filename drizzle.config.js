import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: 'mysql',
    schema: "./src/entities",
    dbCredentials: {
        host: 'localhost',
        port: 3306,
        user: 'user',
        password: 'password',
        database: 'testdb',
    },
});