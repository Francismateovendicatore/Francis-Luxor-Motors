// routes/vehicles.js
// Rutas de la API de vehiculos - usa PostgreSQL via pool

const { Router } = require('express');
const router = Router();
const pool = require('../database');

// GET /api/vehicles — Retorna TODOS los vehiculos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vehicles ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error GET /api/vehicles:', err.message);
    res.status(500).json({ error: 'Error al obtener vehiculos' });
  }
});

// GET /api/vehicles/:slug — Retorna UN solo vehiculo
// Ejemplo: /api/vehicles/bugatti-chiron
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query('SELECT * FROM vehicles WHERE slug = $1', [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vehiculo no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error GET /api/vehicles/:slug:', err.message);
    res.status(500).json({ error: 'Error al obtener vehiculo' });
  }
});

module.exports = router;
