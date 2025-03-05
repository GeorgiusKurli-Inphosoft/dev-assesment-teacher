import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./entities",
  dbCredentials: {
    url: "mysql://testuser:testpassword@localhost:3307/unittestdb",
  },
});
