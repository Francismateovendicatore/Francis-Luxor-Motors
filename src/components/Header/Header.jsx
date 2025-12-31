// Importamos dos hooks fundamentales de React:
// useState → para manejar estado interno del componente
// useEffect → para ejecutar código cuando el componente se monta
import { useEffect, useState } from "react";

// Importamos la imagen del logo / emblema de la marca
// Esto permite que Vite / React gestione correctamente el archivo
import BrandEmblem from "../../assets/Screenshot 2025-12-22 132253.png";

// Importamos los estilos CSS específicos del Header
import "./Header.css";

/*
  Colección de nombres posibles para la marca.
  Se usa un array para poder elegir uno de forma aleatoria.
*/
const BRAND_COLLECTION = [
  "Francis Luxor Auto",
  "Francis Luxure Motors",
  "Francis Luxuria Motors",
];

/*
  Componente Header
  Es un componente funcional de React (function component)
*/
export default function Header() {
  /*
    useState:
    - brandIdentity → valor actual del nombre de la marca
    - setBrandIdentity → función para cambiar ese valor

    Inicialmente usamos el primer nombre del array
  */
  const [brandIdentity, setBrandIdentity] = useState(BRAND_COLLECTION[0]);

  /*
    useEffect:
    - Se ejecuta SOLO UNA VEZ cuando el componente se monta
    - El array [] vacío indica que no depende de nada más
  */
  useEffect(() => {
    // Generamos un índice aleatorio basado en la cantidad de marcas
    const selectedIndex = Math.floor(Math.random() * BRAND_COLLECTION.length);

    // Cambiamos el estado con el nombre seleccionado aleatoriamente
    setBrandIdentity(BRAND_COLLECTION[selectedIndex]);
  }, []);

  /*
    JSX que se renderiza en pantalla
  */
  return (
    // Contenedor principal del header
    <header className="header__root">
      {/* Contenedor interno para centrar y organizar el contenido */}
      <div className="header__content">
        {/* Contenedor del emblema / logo */}
        <figure className="header__emblem-wrapper">
          {/* Imagen del emblema */}
          <img
            className="header__emblem"
            src={BrandEmblem}
            alt="Francis Automotive Emblem"
          />

          {/* Capa decorativa para el efecto de glow */}
          <div className="header__emblem-glow" />
        </figure>

        {/* Contenedor del texto (tipografía) */}
        <div className="header__typography">
          {/* Título principal que muestra el nombre elegido */}
          <h1 className="header__title">{brandIdentity}</h1>

          {/* Línea separadora decorativa */}
          <div className="header__separator" />

          {/* Subtítulo descriptivo */}
          <p className="header__subtitle">
            Curated Hypercars & Automotive Excellence
          </p>
        </div>
      </div>
    </header>
  );
}
