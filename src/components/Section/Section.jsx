/* ======================================================
   COMPONENTE BASE: Section
   - Molde reutilizable de secciones
   - Centraliza estructura, título y estilos
   - Usa composición mediante children
   ====================================================== */

/*
  IMPORTANTE:
  - React pasa automáticamente `children`
  - props contiene cualquier atributo extra (id, className, etc.)
*/

export default function Section({ title, children, ...props }) {
  /*
    title     → texto del título de la sección
    children  → contenido dinámico (botones, cards, paneles, etc.)
    ...props  → cualquier prop adicional que venga desde fuera
               (id, className, data-attributes, etc.)
  */

  return (
    /* --------------------------------------------------
       <section>
       - Etiqueta semántica HTML
       - Recibe props dinámicos desde el componente padre
       - Ejemplo:
         <Section id="reactExamples" className="interaction-panel" />
       -------------------------------------------------- */
    <section {...props}>
      {/* ----------------------------------------------
         TÍTULO DE SECCIÓN
         - h2 porque es jerárquicamente correcto
         - Clase centralizada para estilo uniforme
         ---------------------------------------------- */}
      <h2 className="panel-title">{title}</h2>

      {/* ----------------------------------------------
         CHILDREN (CLAVE DEL DISEÑO)
         - Aquí se inyecta TODO el contenido específico
         - Botones, cards, grids, paneles, etc.
         - Sin esta línea:
           ❌ no renderiza nada
           ❌ los botones no aparecen
           ❌ el componente queda vacío
         ---------------------------------------------- */}
      {children}
    </section>
  );
}
