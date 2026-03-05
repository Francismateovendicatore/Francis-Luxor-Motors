const { Router } = require("express");
const router = Router();
const pool = require("../database");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: "Error al obtener ordenes" }); }
});

router.post("/", async (req, res) => {
  const { vehicle_slug, vehicle_model, price, color, interior, performance, wheels, total_price } = req.body;
  if (!vehicle_slug || !vehicle_model) return res.status(400).json({ error: "Faltan campos" });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const stockRes = await client.query("SELECT stock FROM vehicles WHERE slug = $1", [vehicle_slug]);
    if (stockRes.rows.length === 0) { await client.query("ROLLBACK"); return res.status(404).json({ error: "Vehiculo no encontrado" }); }
    const currentStock = parseInt(stockRes.rows[0].stock);
    if (isNaN(currentStock) || currentStock <= 0) { await client.query("ROLLBACK"); return res.status(400).json({ error: "Sin stock disponible" }); }
    const newStock = currentStock - 1;
    const newStockStr = newStock === 1 ? "1 Unit Available" : newStock + " Units Available";
    await client.query("UPDATE vehicles SET stock = $1 WHERE slug = $2", [newStockStr, vehicle_slug]);
    const orderRes = await client.query("INSERT INTO orders (vehicle_slug, vehicle_model, price, color, interior, performance, wheels, total_price) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", [vehicle_slug, vehicle_model, price, color, interior, performance, wheels, total_price]);
    await client.query("COMMIT");
    res.status(201).json({ order: orderRes.rows[0], newStock: newStockStr });
  } catch (err) { await client.query("ROLLBACK"); res.status(500).json({ error: err.message }); }
  finally { client.release(); }
});

router.delete("/:id", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const orderRes = await client.query("SELECT * FROM orders WHERE id = $1", [req.params.id]);
    if (orderRes.rows.length === 0) { await client.query("ROLLBACK"); return res.status(404).json({ error: "Orden no encontrada" }); }
    const order = orderRes.rows[0];
    const stockRes = await client.query("SELECT stock FROM vehicles WHERE slug = $1", [order.vehicle_slug]);
    if (stockRes.rows.length > 0) {
      const current = parseInt(stockRes.rows[0].stock) || 0;
      const restored = current + 1;
      const restoredStr = restored === 1 ? "1 Unit Available" : restored + " Units Available";
      await client.query("UPDATE vehicles SET stock = $1 WHERE slug = $2", [restoredStr, order.vehicle_slug]);
    }
    await client.query("DELETE FROM orders WHERE id = $1", [req.params.id]);
    await client.query("COMMIT");
    res.json({ success: true });
  } catch (err) { await client.query("ROLLBACK"); res.status(500).json({ error: err.message }); }
  finally { client.release(); }
});

module.exports = router;

router.get("/admin", async (req, res) => {
  try {
    const result = await pool.query("SELECT o.*, v.model as car_model FROM orders o LEFT JOIN vehicles v ON o.vehicle_slug = v.slug ORDER BY o.created_at DESC");
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
