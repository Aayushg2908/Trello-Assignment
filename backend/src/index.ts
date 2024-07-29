import express from "express";
import cors from "cors";
import cookies from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
import { connectDB } from "./helpers/db";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookies());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
