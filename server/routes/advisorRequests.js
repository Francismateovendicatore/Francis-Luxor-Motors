// server/routes/advisorRequests.js
// Francis Luxor Motors — Private Advisor Request endpoint
//
// Register in app.js:
//   const advisorRouter = require("./routes/advisorRequests");
//   app.use("/api/advisor-requests", advisorRouter);

const express  = require("express");
const router   = express.Router();
const pool     = require("../database");
const { adminAuth } = require("../middleware/auth");

/* ── helpers ── */
function generateRef() {
  // FLM-XXXX where XXXX is a random 4-digit number
  return "FLM-" + String(Math.floor(1000 + Math.random() * 9000));
}

function sanitize(str) {
  if (!str) return null;
  return String(str).trim().slice(0, 500);
}

/* ══════════════════════════════════════════════════════
   POST /api/advisor-requests
   Public — no auth required (client-facing form)
   Body: { fullName, email, phone, vehicleInterest, message }
   ══════════════════════════════════════════════════════ */
router.post("/", async (req, res) => {
  const { fullName, email, phone, vehicleInterest, message } = req.body;

  /* ── Validation ── */
  const errors = {};
  if (!fullName || !String(fullName).trim())
    errors.fullName = "Full name is required";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim()))
    errors.email = "A valid email address is required";

  if (Object.keys(errors).length) {
    return res.status(422).json({ success: false, errors });
  }

  /* ── Generate unique reference (retry on collision) ── */
  let reference;
  let attempts = 0;
  while (!reference && attempts < 10) {
    const candidate = generateRef();
    const exists = await pool.query(
      "SELECT id FROM advisor_requests WHERE reference = $1",
      [candidate]
    );
    if (exists.rows.length === 0) reference = candidate;
    attempts++;
  }
  if (!reference) {
    return res.status(500).json({ success: false, error: "Unable to generate reference. Please try again." });
  }

  /* ── Insert into PostgreSQL ── */
  try {
    const result = await pool.query(
      `INSERT INTO advisor_requests
         (full_name, email, phone, vehicle_interest, message, reference, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, reference, created_at`,
      [
        sanitize(fullName),
        sanitize(email),
        sanitize(phone)           || null,
        sanitize(vehicleInterest) || null,
        sanitize(message)         || null,
        reference,
        req.ip || req.headers["x-forwarded-for"] || null,
      ]
    );

    const row = result.rows[0];

    return res.status(201).json({
      success:   true,
      reference: row.reference,
      createdAt: row.created_at,
      message:   "Your advisor request has been received. A dedicated specialist will contact you within 2 hours.",
    });

  } catch (err) {
    console.error("[advisor-requests] DB insert error:", err.message);
    return res.status(500).json({
      success: false,
      error:   "An unexpected error occurred. Please try again or contact us directly.",
    });
  }
});

/* ══════════════════════════════════════════════════════
   GET /api/advisor-requests
   Admin only — requires X-Admin-Token header
   Returns all requests, newest first
   Query params: ?status=pending&limit=50&offset=0
   ══════════════════════════════════════════════════════ */
router.get("/", adminAuth, async (req, res) => {
  const { status, limit = 50, offset = 0 } = req.query;

  try {
    let query  = "SELECT * FROM advisor_requests";
    const params = [];

    if (status) {
      params.push(status);
      query += " WHERE status = $1";
    }

    query += " ORDER BY created_at DESC";
    params.push(Number(limit));
    query += ` LIMIT $${params.length}`;
    params.push(Number(offset));
    query += ` OFFSET $${params.length}`;

    const result = await pool.query(query, params);
    const countQ = status
      ? await pool.query("SELECT COUNT(*) FROM advisor_requests WHERE status = $1", [status])
      : await pool.query("SELECT COUNT(*) FROM advisor_requests");

    return res.json({
      success: true,
      total:   parseInt(countQ.rows[0].count),
      data:    result.rows,
    });
  } catch (err) {
    console.error("[advisor-requests] GET error:", err.message);
    return res.status(500).json({ success: false, error: "Database error." });
  }
});

/* ══════════════════════════════════════════════════════
   PATCH /api/advisor-requests/:id/status
   Admin only — update status of a request
   Body: { status: "pending" | "contacted" | "closed" }
   ══════════════════════════════════════════════════════ */
router.patch("/:id/status", adminAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const VALID = ["pending", "contacted", "closed"];

  if (!VALID.includes(status)) {
    return res.status(422).json({ success: false, error: "Invalid status. Must be pending, contacted, or closed." });
  }

  try {
    const result = await pool.query(
      "UPDATE advisor_requests SET status = $1 WHERE id = $2 RETURNING id, reference, status, updated_at",
      [status, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ success: false, error: "Request not found." });

    return res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("[advisor-requests] PATCH error:", err.message);
    return res.status(500).json({ success: false, error: "Database error." });
  }
});

module.exports = router;
