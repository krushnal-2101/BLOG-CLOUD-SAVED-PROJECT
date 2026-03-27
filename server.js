import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

import dns from "dns"

dns.setServers(["1.1.1.1","8.8.8.8"])
dotenv.config({ path: "./.env" });

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Root route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
