/* ======================================================
   IMPORTACIONES PRINCIPALES
   Aquí traemos TODO lo que este archivo necesita
   ====================================================== */

// Componente Header
// Es la identidad visual principal (logo, navegación, branding)
import Header from "./components/Header/Header";

// Importamos secciones completas de la aplicación
// Cada una representa una "parte funcional" del sistema
// Esto es arquitectura modular (buena práctica en React)
import ExclusiveFleet from "./components/Sections/ExclusiveFleet";
import ModelConfigurator from "./components/Sections/ModelConfigurator";
import ValuationAssessment from "./components/Sections/ValuationAssessment";
import InventorySpecs from "./components/Sections/InventorySpecs";


// Estilos globales de la aplicación
// Aquí viven colores base, tipografías, layouts generales, etc.
import "./index.css";

/* ======================================================
   COMPONENTE PRINCIPAL: App
   - Es el punto de entrada de toda la interfaz
   - Todo lo que se ve en pantalla nace aquí
   ====================================================== */

export default function App() {
  return (
    /* Contenedor raíz de la aplicación
       Aquí envolvemos TODA la UI */
    <div className="app-container">
      {/* ==================================================
          1. IDENTIDAD VISUAL
          Header se renderiza siempre
          Normalmente contiene logo, navegación, marca
         ================================================== */}
      <Header />

      {/* Etiqueta <main>
         Indica el contenido principal de la página
         Mejora accesibilidad y semántica HTML */}
      <main>
        {/* ==================================================
            2. GALERÍA DE EXPOSICIÓN
            - Sección visual
            - No depende de interacción del usuario
            - Muestra los vehículos disponibles
           ================================================== */}
        <ExclusiveFleet />

        {/* ==================================================
            3. SUITE DE EXPERIENCIAS
            - Zona interactiva
            - Aquí el usuario toma decisiones
            - Cada sección es independiente
           ================================================== */}
        <div className="interaction-suite">
          {/* Configuración del modelo del vehículo */}
          <ModelConfigurator />

          {/* Evaluación del valor / precio */}
          <ValuationAssessment />

          {/* Stock y especificaciones técnicas */}
          <InventorySpecs />
        </div>
      </main>
    </div>
  );
}
