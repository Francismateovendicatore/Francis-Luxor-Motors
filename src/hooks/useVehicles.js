import { useState, useEffect } from "react";

export function useVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://francis-luxor-motors.onrender.com/api/vehicles")
      .then((res) => res.json())
      .then((data) => { setVehicles(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  return { vehicles, loading, error };
}
