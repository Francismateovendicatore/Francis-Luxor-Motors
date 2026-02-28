// ExclusiveFleet.jsx
import { useState, useEffect } from "react";
import CoreConcept from "../CoreConcept/CoreConcept";
import Section from "../Section/Section";

export default function ExclusiveFleet({ onSelectCar }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cars")
      .then((response) => response.json())
      .then((json) => {
        setCars(json.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los vehículos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Section id="core-concepts" title="Exclusive Fleet" className="section-showcase">
        <p style={{ textAlign: "center", color: "#aaa", padding: "40px 0" }}>
          Cargando vehículos...
        </p>
      </Section>
    );
  }

  return (
    <Section id="core-concepts" title="Exclusive Fleet" className="section-showcase">
      <div className="cards-container">
        {cars.map((car) => (
          <CoreConcept
            key={car.id}
            image={`/assets/${car.src}`}
            model={car.model}
            price={car.valuation}
            availability={car.stock}
            description={car.description}
            onSelect={() => onSelectCar(car.model)}
          />
        ))}
      </div>
    </Section>
  );
}
