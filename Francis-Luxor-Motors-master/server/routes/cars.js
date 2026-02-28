const express = require("express");
const router = express.Router();
const { getDb } = require("../database");

function withHighlights(cars) {
  const db = getDb();
  return cars.map(car => {
    const highlights = db.prepare(
      "SELECT highlight FROM car_highlights WHERE car_id = ? ORDER BY sort_order ASC"
    ).all(car.id).map(h => h.highlight);
    return { ...car, highlights };
  });
}

router.get("/", (req, res) => {
  try {
    const db = getDb();
    const { category, search } = req.query;
    let query = "SELECT * FROM cars";
    const params = [];
    if (category) { query += " WHERE category = ?"; params.push(category); }
    if (search) {
      query += category ? " AND" : " WHERE";
      query += " (model LIKE ? OR manufacturer LIKE ? OR description LIKE ?)";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    query += " ORDER BY year DESC";
    res.json({ success: true, data: withHighlights(db.prepare(query).all(...params)) });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get("/categories", (req, res) => {
  try {
    const db = getDb();
    const categories = db.prepare("SELECT DISTINCT category FROM cars ORDER BY category").all().map(c => c.category);
    res.json({ success: true, data: categories });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.get("/:id", (req, res) => {
  try {
    const db = getDb();
    const car = db.prepare("SELECT * FROM cars WHERE id = ?").get(req.params.id);
    if (!car) return res.status(404).json({ success: false, error: "Car not found" });
    const highlights = db.prepare("SELECT highlight FROM car_highlights WHERE car_id = ? ORDER BY sort_order ASC")
      .all(car.id).map(h => h.highlight);
    res.json({ success: true, data: { ...car, highlights } });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.post("/", (req, res) => {
  try {
    const db = getDb();
    const { highlights = [], ...carData } = req.body;
    const insertCar = db.prepare(`INSERT INTO cars (id,src,model,manufacturer,valuation,stock,rarity,year,origin,description,category,drivetrain,transmission) VALUES (@id,@src,@model,@manufacturer,@valuation,@stock,@rarity,@year,@origin,@description,@category,@drivetrain,@transmission)`);
    const insertH = db.prepare("INSERT INTO car_highlights (car_id,highlight,sort_order) VALUES (?,?,?)");
    db.transaction(() => { insertCar.run(carData); highlights.forEach((h,i) => insertH.run(carData.id,h,i)); })();
    res.status(201).json({ success: true, message: "Car added" });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.put("/:id", (req, res) => {
  try {
    const db = getDb();
    const { highlights, ...carData } = req.body;
    db.transaction(() => {
      db.prepare(`UPDATE cars SET src=@src,model=@model,manufacturer=@manufacturer,valuation=@valuation,stock=@stock,rarity=@rarity,year=@year,origin=@origin,description=@description,category=@category,drivetrain=@drivetrain,transmission=@transmission,updated_at=CURRENT_TIMESTAMP WHERE id=@id`)
        .run({ ...carData, id: req.params.id });
      if (highlights) {
        db.prepare("DELETE FROM car_highlights WHERE car_id=?").run(req.params.id);
        const ih = db.prepare("INSERT INTO car_highlights (car_id,highlight,sort_order) VALUES (?,?,?)");
        highlights.forEach((h,i) => ih.run(req.params.id,h,i));
      }
    })();
    res.json({ success: true, message: "Car updated" });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

router.delete("/:id", (req, res) => {
  try {
    getDb().prepare("DELETE FROM cars WHERE id=?").run(req.params.id);
    res.json({ success: true, message: "Car deleted" });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

module.exports = router;
