import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import documentTypeRoutes from "./routes/document.route";
import path from "path";
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/document-types", documentTypeRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
