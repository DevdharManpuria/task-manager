require("dotenv").config();          // ← HERE
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes    = require("./routes/authRoutes");
const profileRoutes = require("./routes/profile");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("✅ API is working!"));
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.log("MongoDB error →", err));
