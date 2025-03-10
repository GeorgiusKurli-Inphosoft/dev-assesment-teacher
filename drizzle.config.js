import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./src/entities",
  dbCredentials: {
    url: "mysql://user:password@localhost:3306/testdb",
  },
});
