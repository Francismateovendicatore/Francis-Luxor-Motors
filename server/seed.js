// seed.js
// Este archivo "siembra" los datos iniciales en la base de datos.
// Solo los inserta si la tabla está vacía.

const fs = require("fs");

const VEHICLES = [
  {
    slug: "bugatti-chiron",
    model: "Bugatti Chiron",
    valuation: "€4,000,000",
    stock: "5 Units Available",
    description:
      "The pinnacle of automotive engineering featuring a quad-turbocharged W16 powerplant and unparalleled luxury.",
    engineDesc:
      "Corazón W16 de 8.0L: Una obra maestra de ingeniería con 4 turbocompresores y refrigeración líquida avanzada. La perfecta sincronía entre 16 cilindros genera una sinfonía mecánica inigualable.",
    hp: "1500",
    top: "420",
    accent: "#ff3e3e",
  },
  {
    slug: "ferrari-roma",
    model: "Ferrari Roma",
    valuation: "€300,000",
    stock: "15 Units Available",
    description:
      "A contemporary representation of the 'La Nuova Dolce Vita', combining timeless elegance with a high-performance V8.",
    engineDesc:
      "V8 Turbo de 3.9L: Elegancia italiana con una respuesta de aceleración instantánea y sonido sinfónico. El rugido del Cavallino Rampante en su máxima expresión contemporánea.",
    hp: "620",
    top: "320",
    accent: "#ffff00",
  },
  {
    slug: "pagani-huayra",
    model: "Pagani Huayra",
    valuation: "€3,000,000",
    stock: "3 Units Available",
    description:
      "A masterful fusion of art and science, handcrafted with an AMG-sourced V12 and active aerodynamics.",
    engineDesc:
      "V12 Biturbo de Mercedes-AMG: Ligereza extrema y aerodinámica activa en cada centímetro de fibra de carbono. Arte italiano fusionado con ingeniería alemana de precisión absoluta.",
    hp: "800",
    top: "380",
    accent: "#00f2ff",
  },
  {
    slug: "rolls-royce-phantom",
    model: "Rolls-Royce Phantom",
    valuation: "€450,000",
    stock: "5 Units Available",
    description:
      "The definitive symbol of opulence and bespoke craftsmanship, offering an effortless 'Magic Carpet Ride'.",
    engineDesc:
      "V12 de 6.75L: El epítome del refinamiento británico. Un motor que susurra poder mientras ofrece una entrega de potencia tan suave como la seda, garantizando el legendario 'Magic Carpet Ride'.",
    hp: "571",
    top: "250",
    accent: "#c9b037",
  },
  {
    slug: "toyota-supra-mk5",
    model: "Toyota Supra MK5",
    valuation: "€400,000",
    stock: "9 Units Available",
    description:
      "Precision-engineered sports performance featuring a signature straight-six turbocharged engine and track-focused agility.",
    engineDesc:
      "Motor 6 cilindros en línea (B58) de 3.0L Twin-Scroll Turbo: Desarrollado por BMW y optimizado por Toyota, destaca por su excelente equilibrio entre potencia, fiabilidad y capacidad de respuesta.",
    hp: "382",
    top: "250",
    accent: "#ff3d00",
  },
  {
    slug: "koenigsegg-regera",
    model: "Koenigsegg Regera",
    valuation: "€4,000,000",
    stock: "1 Unit Available",
    description:
      "An innovative plug-in hybrid megacar utilizing the Direct Drive system to redefine hypercar acceleration.",
    engineDesc:
      "V8 Twin-Turbo Híbrido: Innovación sueca revolucionaria con sistema Direct Drive. Sin caja de cambios tradicional, 1500 HP del motor de combustión más 700 HP eléctricos para una aceleración dimensional.",
    hp: "2200",
    top: "410",
    accent: "#d4af37",
  },
  {
    slug: "lamborghini-veneno",
    model: "Lamborghini Veneno",
    valuation: "€9,000,000",
    stock: "2 Units Available",
    description:
      "An ultra-exclusive tribute to aeronautical design, pushing the boundaries of the naturally aspirated V12.",
    engineDesc:
      "V12 Aspirado de 6.5L: Pura brutalidad italiana sin asistencia artificial. Cada revolución es un grito de guerra, cada cilindro una explosión de adrenalina.",
    hp: "750",
    top: "355",
    accent: "#00ff41",
  },
  {
    slug: "aston-martin-valkyrie",
    model: "Aston Martin Valkyrie",
    valuation: "€2,500,000",
    stock: "8 Units Available",
    description:
      "Born from a collaboration with Red Bull Racing, this F1-inspired masterpiece delivers raw, track-oriented performance.",
    engineDesc:
      "V12 Híbrido Cosworth de 6.5L: Desarrollado con Red Bull Racing, este motor aspira naturalmente hasta 11,100 RPM. Tecnología F1 adaptada para carretera.",
    hp: "1160",
    top: "400",
    accent: "#00d9ff",
  },
  {
    slug: "hennessey-venom-f5",
    model: "Hennessey Venom F5",
    valuation: "€1,850,000",
    stock: "2 Units Available",
    description:
      "The Hennessey Venom F5 is an ultra-high-performance hypercar built for extreme speed with over 1,800 horsepower.",
    engineDesc:
      "V8 Twin-Turbo 'Fury' de 6.6L: Diseñado íntegramente por Hennessey para romper récords de velocidad. Más de 1800 HP de potencia pura estadounidense en un chasis de fibra de carbono ultraligero.",
    hp: "1817",
    top: "484",
    accent: "#ff1744",
  },
];

// Recibe "db" y "DB_PATH" desde server.js
async function seedDatabase(db, DB_PATH) {
  const result = db.exec("SELECT COUNT(*) as total FROM vehicles");
  const count = result[0].values[0][0];

  if (count > 0) {
    console.log("ℹ️  La base de datos ya tiene datos. No se inserta nada.");
    return;
  }

  VEHICLES.forEach((v) => {
    db.run(
      `INSERT INTO vehicles (slug, model, valuation, stock, description, engineDesc, hp, top, accent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        v.slug,
        v.model,
        v.valuation,
        v.stock,
        v.description,
        v.engineDesc,
        v.hp,
        v.top,
        v.accent,
      ],
    );
  });

  const buffer = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(buffer));

  console.log("✅ Datos insertados exitosamente en la base de datos");
}

module.exports = { seedDatabase };
