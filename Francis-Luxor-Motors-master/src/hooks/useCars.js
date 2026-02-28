import { useState, useEffect } from "react";

const API_URL = "/api";

export function useCars(filters = {}) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchCars() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (filters.category) params.set("category", filters.category);
        if (filters.search) params.set("search", filters.search);
        const res = await fetch(`${API_URL}/cars${params.toString() ? "?" + params : ""}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setCars(json.data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
    return () => controller.abort();
  }, [filters.category, filters.search]);

  return { cars, loading, error };
}

export function useCar(id) {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    async function fetchCar() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/cars/${id}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setCar(json.data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally { setLoading(false); }
    }
    fetchCar();
    return () => controller.abort();
  }, [id]);

  return { car, loading, error };
}
