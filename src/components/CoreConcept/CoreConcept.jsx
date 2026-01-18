/* =========================================================
   IMPORTACIÓN DE ESTILOS
   ---------------------------------------------------------
   Importamos el archivo CSS específico de este componente.
   Aquí se define todo el diseño visual de la tarjeta:
   colores, tamaños, sombras, hover, etc.
========================================================= */
import "./CoreConcept.css";

/* =========================================================
   COMPONENTE CoreConcept
   ---------------------------------------------------------
   Este es un COMPONENTE FUNCIONAL de React.
   Su responsabilidad es mostrar UNA tarjeta de vehículo.

   Recibe datos desde App.jsx mediante PROPS:
   - image: imagen del vehículo
   - model: nombre del modelo
   - price: precio del vehículo
   - availability: stock disponible
   - description: descripción técnica
   - onSelect: (NUEVO) Función para activar la vista detallada
========================================================= */
export default function CoreConcept({
  image,
  model,
  price,
  availability,
  description,
  onSelect, // Recibimos la función que viene desde App -> ExclusiveFleet
}) {
  /* =======================================================
     JSX QUE SE RENDERIZA EN PANTALLA
     -------------------------------------------------------
     Todo lo que está dentro del return es lo que el usuario
     ve en el navegador.
  ======================================================= */
  return (
    /* =====================================================
        CONTENEDOR PRINCIPAL DE LA TARJETA
        -----------------------------------------------------
        <article> se usa para contenido independiente.
        className="card__root" conecta con el CSS.
     ===================================================== */
    <article className="card__root">
      <figure className="card__media">
        <img src={image} alt={model} className="card__image" loading="lazy" />
        <div className="card__overlay" aria-hidden="true" />
      </figure>

      <div className="card__content">
        <header className="card__header">
          <h3 className="card__title">{model}</h3>
          <span className="card__price">{price}</span>
        </header>

        <div className="card__meta">
          <span className="card__badge">{availability}</span>
        </div>

        <p className="card__description">{description}</p>

        {/* =====================================================
            BOTÓN DE ACCIÓN INTERACTIVO
            -----------------------------------------------------
            onClick={onSelect}: Al pulsar aquí, notificamos al 
            estado de App.jsx para cambiar a la vista de detalles.
         ===================================================== */}
        <button className="card__action" type="button" onClick={onSelect}>
          Configurar
        </button>
      </div>
    </article>
  );
}
