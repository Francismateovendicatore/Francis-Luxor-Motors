// server.js
// ARCHIVO PRINCIPAL DEL BACKEND — Francis Luxor

const express = require("express");
const cors = require("cors");
const { initDatabase } = require("./database");
const { seedDatabase } = require("./seed");

const app = express();

// Permite que React hable con este servidor
app.use(cors());

// Permite leer JSON
app.use(express.json());

const PORT = 5000;

// Función principal — es async porque sql.js lo necesita
async function startServer() {
  // 1️⃣ Inicializamos la base de datos
  const { db, DB_PATH } = await initDatabase();

  // 2️⃣ Sembramos datos si la tabla está vacía
  await seedDatabase(db, DB_PATH);

  // 3️⃣ Conectamos las rutas de vehículos
  // Le pasamos db y DB_PATH porque las rutas las necesitan
  const vehiclesRouter = require("./routes/vehicles")(db, DB_PATH);
  app.use("/api/vehicles", vehiclesRouter);

  // 4️⃣ Iniciamos el servidor
  app.listen(PORT, () => {
    console.log("==========================================");
    console.log(`🚀 Servidor Francis Luxor corriendo`);
    console.log(`📍 Backend: http://localhost:${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api/vehicles`);
    console.log("==========================================");
  });
}

// Ejecutamos y si hay error lo mostramos
startServer().catch((err) => {
  console.error("❌ Error al iniciar el servidor:", err);
});
