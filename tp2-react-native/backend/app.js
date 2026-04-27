import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/database.js";
import { taskRoutes } from "./src/routes/task.routes.js";

import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // o la URL de tu frontend
  }),
);

app.use("/api", taskRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`servidor corriendo en el puerto ${PORT}`);
});
