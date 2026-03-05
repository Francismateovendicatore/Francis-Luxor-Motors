// app.js
// Servidor Express para la API de Luxor Motors
// Ejecutar con: node app.js  o  npm start

require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const vehiclesRouter = require('./routes/vehicles');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/vehicles', vehiclesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Luxor Motors API running' });
});

// 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Endpoints disponibles:`);
  console.log(`  GET http://localhost:${PORT}/api/health`);
  console.log(`  GET http://localhost:${PORT}/api/vehicles`);
  console.log(`  GET http://localhost:${PORT}/api/vehicles/:slug`);
});

module.exports = app;
