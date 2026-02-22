require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Import Routes
const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resume");
const aiRoutes = require("./routes/ai");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin.includes("vercel.app") || origin.includes("localhost")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ─── TEMPORARY DEBUG ROUTE — REMOVE AFTER FIXING ───────────
app.post("/debug-auth", (req, res) => {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies.token;
  const secret = process.env.JWT_SECRET;

  const token = cookieToken || (authHeader && authHeader.split(" ")[1]);

  if (!token) {
    return res.json({ error: "No token received", authHeader, cookieToken });
  }

  try {
    const decoded = jwt.verify(token, secret);
    res.json({
      success: true,
      decoded,
      secretLength: secret?.length,
      secretFirst5: secret?.substring(0, 5),
    });
  } catch (err) {
    res.json({
      error: err.message,
      secretLength: secret?.length,
      secretFirst5: secret?.substring(0, 5),
      tokenFirst20: token?.substring(0, 20),
    });
  }
});
// ────────────────────────────────────────────────────────────

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/ai", aiRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => res.send("SmartCV backend running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));