const { getDb } = require("./database");

const CARS_DATA = [
  {
    id: "koenigsegg-regera-001",
    src: "KOENIGSEGG REGERA.jpg",
    model: "Koenigsegg Regera",
    manufacturer: "Koenigsegg Automotive AB",
    valuation: "€4,000,000",
    stock: "1 Unit Available",
    rarity: "1 of 80 Worldwide",
    year: "2024",
    origin: "Ängelholm, Sweden",
    description: "An innovative plug-in hybrid megacar utilizing the revolutionary Direct Drive system. Swedish engineering genius redefining hypercar acceleration without traditional gearbox.",
    highlights: ["V8 Twin-Turbo + 3 Electric Motors","2,200 HP Combined Output","Direct Drive Technology","0-400-0 km/h Record Holder"],
    category: "Megacar Hybrid",
    drivetrain: "RWD",
    transmission: "Direct Drive (No Gearbox)",
  },
  {
    id: "lamborghini-veneno-007",
    src: "lamborghini.jpg",
    model: "Lamborghini Veneno",
    manufacturer: "Automobili Lamborghini S.p.A.",
    valuation: "€8,000,000",
    stock: "1 Unit Available",
    rarity: "1 of 9 Worldwide",
    year: "2014",
    origin: "Sant'Agata Bolognese, Italy",
    description: "The rarest road-legal Lamborghini ever produced. Named after one of the most aggressive fighting bulls in history.",
    highlights: ["6.5L V12 Naturally Aspirated","750 HP at 8,400 RPM","0-100 km/h in 2.8 seconds","Only 9 Units Ever Produced"],
    category: "Hypercar",
    drivetrain: "AWD",
    transmission: "7-Speed ISR",
  },
  {
    id: "hennessey-venom-f5-003",
    src: "Hennessey's Venom F5 Is Named After...jpg",
    model: "Hennessey Venom F5",
    manufacturer: "Hennessey Special Vehicles",
    valuation: "€2,100,000",
    stock: "2 Units Available",
    rarity: "1 of 24 Worldwide",
    year: "2023",
    origin: "Sealy, Texas, USA",
    description: "The most powerful American hypercar ever built. Named after the most destructive tornado category.",
    highlights: ["6.6L Twin-Turbo V8 Fury Engine","1,817 HP / 1,617 lb-ft Torque","Target: 311 mph Top Speed","Carbon Fiber Monocoque Chassis"],
    category: "American Hypercar",
    drivetrain: "RWD",
    transmission: "7-Speed Sequential",
  },
  {
    id: "aston-martin-vulcan-005",
    src: "Astonmartin.jpg",
    model: "Aston Martin Vulcan",
    manufacturer: "Aston Martin Lagonda",
    valuation: "€2,300,000",
    stock: "1 Unit Available",
    rarity: "1 of 24 Worldwide",
    year: "2015",
    origin: "Gaydon, England, UK",
    description: "Aston Martin's most extreme track-only hypercar. Race-derived aerodynamics and an ear-splitting V12.",
    highlights: ["7.0L Naturally Aspirated V12","820+ HP Race-Spec Engine","Full Carbon Fiber Body","Track-Only Configuration"],
    category: "Track Hypercar",
    drivetrain: "RWD",
    transmission: "6-Speed Sequential",
  },
];

function seed() {
  const db = getDb();
  db.prepare("DELETE FROM car_highlights").run();
  db.prepare("DELETE FROM cars").run();

  const insertCar = db.prepare(`
    INSERT INTO cars (id,src,model,manufacturer,valuation,stock,rarity,year,origin,description,category,drivetrain,transmission)
    VALUES (@id,@src,@model,@manufacturer,@valuation,@stock,@rarity,@year,@origin,@description,@category,@drivetrain,@transmission)
  `);
  const insertHighlight = db.prepare(`
    INSERT INTO car_highlights (car_id,highlight,sort_order) VALUES (@car_id,@highlight,@sort_order)
  `);

  const seedAll = db.transaction(() => {
    for (const car of CARS_DATA) {
      const { highlights, ...carData } = car;
      insertCar.run(carData);
      highlights.forEach((highlight, i) => insertHighlight.run({ car_id: car.id, highlight, sort_order: i }));
    }
  });

  seedAll();
  console.log(`✅ Base de datos poblada con ${CARS_DATA.length} coches.`);
}

seed();
