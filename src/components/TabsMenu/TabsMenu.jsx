// src/components/TabsMenu/TabsMenu.jsx

// Este componente es un CONTENEDOR REUTILIZABLE
// Su objetivo es:
// 1. Mostrar una barra de botones (tabs)
// 2. Mostrar contenido dinámico debajo (children)

export default function TabsMenu({
  children, // 👉 CONTENIDO INTERNO (lo que se renderiza debajo de los botones)
  buttons, // 👉 BOTONES (Tabs) que se mostrarán en la barra
  ButtonsContainer = "menu",
  // 👉 Componente dinámico:
  // Si no se pasa nada, será "menu"
  // Pero puede ser "div", "ul", etc.
}) {
  return (
    <>
      {/* 
        BLOQUE 1: CONTENEDOR DE BOTONES (TABS)
        ------------------------------------
        ButtonsContainer es un componente dinámico.
        React permite usar componentes como etiquetas HTML.
        
        Ejemplo:
        <menu>...</menu>
        <div>...</div>
        <ul>...</ul>
      */}
      <ButtonsContainer className="tab-bar">
        {buttons}
        {/* 
          Aquí se renderizan los botones recibidos como props.
          Normalmente serán <TabButton />
        */}
      </ButtonsContainer>

      {/* 
        BLOQUE 2: CONTENIDO PRINCIPAL
        -----------------------------
        children representa TODO lo que se coloque
        entre <TabsMenu>...</TabsMenu>
        
        Normalmente será:
        - El display-surface
        - Texto dinámico
        - Resultados de interacción
      */}
      {children}
    </>
  );
}
