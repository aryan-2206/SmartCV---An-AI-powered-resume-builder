require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Enable CORS for the Vite dev server and allow cookies
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("SmartCV backend running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
