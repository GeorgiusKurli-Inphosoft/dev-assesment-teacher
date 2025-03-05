import { db } from "./db";
import mainRoutes from "./routes/main-routes";
import express, { Application } from "express";
import { errorMiddleware } from "./middleware/error-middleware";

const app: Application = express();
const PORT = 3000;

app.use(express.json());

// Use main routes
app.use("/api", mainRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
