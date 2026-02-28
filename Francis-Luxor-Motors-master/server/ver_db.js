const db = require('better-sqlite3')('./luxor_motors.db');
const tablas = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('TABLAS:', tablas);
tablas.forEach(tabla => {
  console.log('\n=== ' + tabla.name + ' ===');
  const datos = db.prepare('SELECT * FROM ' + tabla.name).all();
  console.log(JSON.stringify(datos, null, 2));
});
