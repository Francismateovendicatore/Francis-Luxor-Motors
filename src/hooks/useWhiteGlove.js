// src/hooks/useWhiteGlove.js
import { useState, useEffect } from "react";

const API = (import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api";

export function useWhiteGloveStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/services/stats`)
      .then((r) => r.json())
      .then((d) => {
        setStats(d);
        setLoading(false);
      })
      .catch(() => {
        // Graceful fallback
        setStats({
          totalVehicles: 9,
          availableVehicles: 7,
          totalUnits: 50,
          totalOrders: 0,
        });
        setLoading(false);
      });
  }, []);

  return { stats, loading };
}

export function useFleetSummary() {
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/services/fleet-summary`)
      .then((r) => r.json())
      .then((d) => {
        setFleet(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => {
        setFleet([]);
        setLoading(false);
      });
  }, []);

  return { fleet, loading };
}
