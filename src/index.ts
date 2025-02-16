import "reflect-metadata";
import http from "http";
import { AppDataSource } from "./data-source";
import mainRoutes from "./routes/main-routes";

const PORT = process.env.PORT || 3000;

// Initialize data source, create server and start listening
AppDataSource.initialize()
  .then(() => {
    const server = http.createServer((req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/json");
      mainRoutes(req, res);
    });

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
