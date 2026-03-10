const { Router } = require('express');
const router = Router();
const pool = require('../database');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vehicles ORDER BY id');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: 'Error al obtener vehiculos' }); }
});

router.get('/:slug', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vehicles WHERE slug = $1', [req.params.slug]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Vehiculo no encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: 'Error al obtener vehiculo' }); }
});

router.post('/', async (req, res) => {
  const { slug, model, valuation, stock, description, category, hp, top, accent, engine_desc } = req.body;
  if (!slug || !model) return res.status(400).json({ error: 'slug y model son requeridos' });
  try {
    const result = await pool.query(
      'INSERT INTO vehicles (slug, model, valuation, stock, description, category, hp, top, accent, engine_desc, image_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *',
      [slug, model, valuation, stock, description, category, hp, top, accent, engine_desc, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:slug', async (req, res) => {
  const { model, valuation, stock, description, category, hp, top, accent, engine_desc } = req.body;
  try {
    const result = await pool.query(
      'UPDATE vehicles SET model=$1, valuation=$2, stock=$3, description=$4, category=$5, hp=$6, top=$7, accent=$8, engine_desc=$9 WHERE slug=$10 RETURNING *',
      [model, valuation, stock, description, category, hp, top, accent, engine_desc, req.params.slug]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Vehiculo no encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:slug', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM vehicles WHERE slug = $1 RETURNING *', [req.params.slug]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Vehiculo no encontrado' });
    res.json({ success: true, deleted: result.rows[0] });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.patch('/:slug/stock', async (req, res) => {
  try {
    const { stock } = req.body;
    await pool.query('UPDATE vehicles SET stock = $1 WHERE slug = $2', [stock, req.params.slug]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;


