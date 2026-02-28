// database.js
// Este archivo maneja la conexión con la base de datos SQLite.
// Usamos sql.js porque funciona en Windows sin necesitar Python.

const initSqlJs = require("sql.js");
const path = require("path");
const fs = require("fs");

// Ruta donde se guarda el archivo de la base de datos
const DB_PATH = path.join(__dirname, "vehicles.db");

// Esta función inicializa la base de datos.
// Es async porque sql.js necesita tiempo para cargarse.
async function initDatabase() {
  // 1️⃣ Cargamos el motor de SQLite
  const SQL = await initSqlJs();

  let db;

  // 2️⃣ Si ya existe el archivo .db, lo abrimos
  // Si no existe, creamos uno nuevo
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // 3️⃣ Creamos la tabla "vehicles" si no existe
  db.run(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL,
      model TEXT NOT NULL,
      valuation TEXT NOT NULL,
      stock TEXT NOT NULL,
      description TEXT NOT NULL,
      engineDesc TEXT NOT NULL,
      hp TEXT NOT NULL,
      top TEXT NOT NULL,
      accent TEXT NOT NULL
    );
  `);

  // 4️⃣ Guardamos los cambios en el archivo .db
  const buffer = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(buffer));

  // 5️⃣ Retornamos db y DB_PATH para usarlos después
  return { db, DB_PATH };
}

module.exports = { initDatabase };
