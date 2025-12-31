/* ===========================
   IMPORTACIONES
   =========================== */

/*
 Importamos el archivo CSS específico de este componente.
 Aquí se definen los estilos visuales del botón (color, hover, tamaño, etc.).
*/
import "./TabButtonPrice.css";

/* ===========================
   COMPONENTE TabButtonPrice
   =========================== */

/*
 Definimos y exportamos el componente funcional TabButtonPrice.
 
 - Es un componente reutilizable.
 - Recibe datos desde el componente padre mediante PROPS.
 - Se usa principalmente para manejar eventos (clicks).
*/
export default function TabButtonPrice({ children, onSelect }) {
  /*
   children:
   - Es un prop especial de React.
   - Representa el contenido que se coloca ENTRE las etiquetas del componente.
   - Ejemplo:
       <TabButton>Bugatti</TabButton>
     → children = "Bugatti"

   onSelect:
   - Es una función que viene del componente padre (App.jsx).
   - Se ejecuta cuando el usuario hace click en el botón.
   - Normalmente cambia un estado con useState.
  */

  return (
    /*
     <li>:
     - El botón está envuelto en un <li> porque normalmente
       estos botones se renderizan dentro de un <menu> o <ul>.
     - Esto mantiene una estructura HTML semántica correcta.
    */
    <li>
      {/*
        <button>:
        - Elemento interactivo.
        - onClick es un EVENTO de React.
        - Cuando el usuario hace click, se ejecuta la función onSelect.
        - React NO ejecuta la función aquí, solo la referencia.
      */}
      <button onClick={onSelect}>
        {/*
          children:
          - Aquí se renderiza el texto o contenido del botón.
          - Puede ser texto, iconos, o incluso otros componentes.
        */}
        {children}
      </button>
    </li>
  );
}
