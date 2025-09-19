import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import registryRoutes from "./routes/registry.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();
const app = express();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:8080";
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/registry", registryRoutes);
app.use("/api/upload", uploadRoutes);

// MongoDB connect
const mongoUri = process.env.MONGO_URI || "mongodb+srv://neelanchal:Askrithe40@clusterg.l3yzewq.mongodb.net/neelanchal?retryWrites=true&w=majority";
mongoose.connect(mongoUri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
