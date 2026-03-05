// seed.js
// Inserta los 9 vehiculos iniciales en PostgreSQL
// Ejecutar UNA SOLA VEZ con: node seed.js

require('dotenv').config();
const pool = require('./database');

const VEHICLES = [
  { slug: 'bugatti-chiron', model: 'Bugatti Chiron', valuation: '4,000,000', stock: '5 Units Available', description: 'The pinnacle of automotive engineering featuring a quad-turbocharged W16 powerplant.', engine_desc: 'W16 de 8.0L con 4 turbocompresores. La perfecta sincronia entre 16 cilindros.', hp: '1500', top: '420', accent: '#ff3e3e' },
  { slug: 'ferrari-roma', model: 'Ferrari Roma', valuation: '300,000', stock: '15 Units Available', description: 'A contemporary representation of La Nuova Dolce Vita combining elegance with V8 performance.', engine_desc: 'V8 Turbo de 3.9L con respuesta de aceleracion instantanea y sonido sinfonico.', hp: '620', top: '320', accent: '#ffff00' },
  { slug: 'pagani-huayra', model: 'Pagani Huayra', valuation: '3,000,000', stock: '3 Units Available', description: 'A masterful fusion of art and science handcrafted with AMG V12 and active aerodynamics.', engine_desc: 'V12 Biturbo de Mercedes-AMG. Arte italiano fusionado con ingenieria alemana.', hp: '800', top: '380', accent: '#00f2ff' },
  { slug: 'rolls-royce-phantom', model: 'Rolls-Royce Phantom', valuation: '450,000', stock: '5 Units Available', description: 'The definitive symbol of opulence and bespoke craftsmanship.', engine_desc: 'V12 de 6.75L. El epitome del refinamiento britanico con Magic Carpet Ride.', hp: '571', top: '250', accent: '#c9b037' },
  { slug: 'toyota-supra-mk5', model: 'Toyota Supra MK5', valuation: '400,000', stock: '9 Units Available', description: 'Precision-engineered sports performance with straight-six turbocharged engine.', engine_desc: 'Motor 6 cilindros B58 de 3.0L Twin-Scroll Turbo desarrollado con BMW.', hp: '382', top: '250', accent: '#ff3d00' },
  { slug: 'koenigsegg-regera', model: 'Koenigsegg Regera', valuation: '4,000,000', stock: '1 Unit Available', description: 'An innovative plug-in hybrid megacar with Direct Drive system.', engine_desc: 'V8 Twin-Turbo Hibrido. Sin caja de cambios tradicional. 1500 HP mas 700 HP electricos.', hp: '2200', top: '410', accent: '#d4af37' },
  { slug: 'lamborghini-veneno', model: 'Lamborghini Veneno', valuation: '9,000,000', stock: '2 Units Available', description: 'An ultra-exclusive tribute to aeronautical design pushing V12 boundaries.', engine_desc: 'V12 Aspirado de 6.5L. Pura brutalidad italiana sin asistencia artificial.', hp: '750', top: '355', accent: '#00ff41' },
  { slug: 'aston-martin-valkyrie', model: 'Aston Martin Valkyrie', valuation: '2,500,000', stock: '8 Units Available', description: 'Born from collaboration with Red Bull Racing this F1-inspired masterpiece delivers raw performance.', engine_desc: 'V12 Hibrido Cosworth de 6.5L desarrollado con Red Bull Racing hasta 11100 RPM.', hp: '1160', top: '400', accent: '#00d9ff' },
  { slug: 'hennessey-venom-f5', model: 'Hennessey Venom F5', valuation: '1,850,000', stock: '2 Units Available', description: 'Ultra-high-performance hypercar built for extreme speed with over 1800 horsepower.', engine_desc: 'V8 Twin-Turbo Fury de 6.6L disenado para romper records de velocidad.', hp: '1817', top: '484', accent: '#ff1744' }
];

async function seed() {
  try {
    console.log('Iniciando seed...');

    // Verificar si ya hay datos
    const check = await pool.query('SELECT COUNT(*) FROM vehicles');
    const count = parseInt(check.rows[0].count);

    if (count > 0) {
      console.log('La tabla ya tiene ' + count + ' vehiculos. Limpiando...');
      await pool.query('TRUNCATE TABLE vehicles RESTART IDENTITY');
    }

    // Insertar cada vehiculo
    for (const v of VEHICLES) {
      await pool.query(
        'INSERT INTO vehicles (slug, model, valuation, stock, description, engine_desc, hp, top, accent) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
        [v.slug, v.model, v.valuation, v.stock, v.description, v.engine_desc, v.hp, v.top, v.accent]
      );
      console.log('  OK: ' + v.model);
    }

    console.log('');
    console.log('Seed completado - ' + VEHICLES.length + ' vehiculos insertados');
    process.exit(0);

  } catch (error) {
    console.error('Error en seed:', error.message);
    process.exit(1);
  }
}

seed();


