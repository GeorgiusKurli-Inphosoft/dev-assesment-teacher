import "reflect-metadata";
import { AppDataSource } from "./data-source";
import mainRoutes from "./routes/main-routes";
import express, { Application } from "express";
import { errorMiddleware } from "./middleware/error-middleware";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Initialize data source, create server and start listening
AppDataSource.initialize()
  .then(() => {
    app.use(express.json());
    app.use("/api", mainRoutes);
    app.use(errorMiddleware);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
