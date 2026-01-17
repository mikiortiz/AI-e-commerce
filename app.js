const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

// 🔌 DB (solo lectura)
require("./config/db")();

const app = express();

// ===============================
// MIDDLEWARES
// ===============================
app.use(logger("dev"));
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: false }));

// ===============================
// CORS
// ===============================
const corsOptions = {
  origin: "*", // después lo restringimos si querés
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// ===============================
// ROUTES
// ===============================
app.use("/api/ai", require("./routes/ai.routes"));

// ===============================
// HEALTH CHECK
// ===============================
app.get("/", (req, res) => {
  res.json({ status: "🧠 AI Service running" });
});

// ===============================
// 404
// ===============================
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint no encontrado" });
});

// ===============================
// ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

module.exports = app;
