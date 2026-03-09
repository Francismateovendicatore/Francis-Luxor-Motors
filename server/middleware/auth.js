// server/middleware/auth.js
// Simple token-based admin authentication middleware

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "luxor-admin-2024";

/**
 * Middleware: verifies X-Admin-Token header.
 * Usage: router.post("/", adminAuth, async (req, res) => { ... })
 */
function adminAuth(req, res, next) {
  const token = req.headers["x-admin-token"];
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized. Admin token required." });
  }
  next();
}

module.exports = { adminAuth };
