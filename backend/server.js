const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const path = require("path");
// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// Test route
app.get("/", (req, res) => {
  res.send("AI Study Assistant Backend Running");
});
// Auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
// Notes routes  ✅ STEP 5 FIX
const notesRoutes = require("./routes/notes");
app.use("/api/notes", notesRoutes);
// Serve uploads folder
app.use("/uploads", express.static("uploads"));
// AI routes
const aiRoutes = require("./routes/ai");
app.use("/api/ai", aiRoutes);
// Planner routes
const plannerRoutes = require("./routes/planner");
app.use("/api/planner", plannerRoutes);
// Quiz routes
const quizRoutes = require("./routes/quiz");
app.use("/api/quiz", quizRoutes);

// Start server (ALWAYS LAST)
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

