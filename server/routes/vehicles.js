// routes/vehicles.js
// Define las rutas de la API de vehículos.
// Es una función que recibe "db" y "DB_PATH" desde server.js

const { Router } = require("express");

module.exports = function (db, DB_PATH) {
  const router = Router();

  // ─────────────────────────────────────────────
  // GET /api/vehicles — Retorna TODOS los vehículos
  // ─────────────────────────────────────────────
  router.get("/", (req, res) => {
    const result = db.exec("SELECT * FROM vehicles");

    if (result.length === 0) {
      return res.json([]);
    }

    // Convertimos el formato de sql.js a objetos normales
    const columns = result[0].columns;
    const rows = result[0].values;

    const vehicles = rows.map((row) => {
      const obj = {};
      columns.forEach((col, index) => {
        obj[col] = row[index];
      });
      return obj;
    });

    res.json(vehicles);
  });

  // ─────────────────────────────────────────────
  // GET /api/vehicles/:slug — Retorna UN solo vehículo
  // Ejemplo: /api/vehicles/bugatti-chiron
  // ─────────────────────────────────────────────
  router.get("/:slug", (req, res) => {
    const { slug } = req.params;

    const result = db.exec("SELECT * FROM vehicles WHERE slug = ?", [slug]);

    if (result.length === 0) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }

    const columns = result[0].columns;
    const row = result[0].values[0];

    const vehicle = {};
    columns.forEach((col, index) => {
      vehicle[col] = row[index];
    });

    res.json(vehicle);
  });

  return router;
};
