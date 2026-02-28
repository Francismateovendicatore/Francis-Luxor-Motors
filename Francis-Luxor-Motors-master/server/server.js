// server.js
// Servidor principal — Francis Luxor Motors
// Base de datos: PostgreSQL

const express = require("express");
const cors = require("cors");
const { initDatabase } = require("./database");
const { seedDatabase } = require("./seed");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Arranque ──────────────────────────────────────────────────────────────────
async function startServer() {
  await initDatabase(); // crea tabla si no existe
  await seedDatabase(); // inserta datos si la tabla está vacía

  const vehiclesRouter = require("./routes/vehicles");
  app.use("/api/vehicles", vehiclesRouter);

  app.listen(PORT, () => {
    console.log("==========================================");
    console.log(`🚀  Servidor Francis Luxor corriendo`);
    console.log(`📍  Backend : http://localhost:${PORT}`);
    console.log(`📡  API     : http://localhost:${PORT}/api/vehicles`);
    console.log("==========================================");
  });
}

startServer().catch((err) => {
  console.error("❌  Error al iniciar el servidor:", err.message);
  process.exit(1);
});
