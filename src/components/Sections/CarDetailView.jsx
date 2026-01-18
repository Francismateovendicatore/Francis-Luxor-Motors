import Section from "../Section/Section";

export default function CarDetailView({ data, name, onClose }) {
  if (!data) return null;

  return (
    <Section title="" id="car-detail">
      <div
        style={{
          animation: "fadeIn 0.6s ease-out",
          background: "#050505",
          minHeight: "100vh",
          color: "white",
          padding: "40px 20px",
        }}
      >
        {/* HEADER ELEGANTE */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto 40px auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottom: "1px solid #222",
            paddingBottom: "20px",
          }}
        >
          <div>
            <span
              style={{
                color: "gold",
                letterSpacing: "5px",
                fontSize: "0.8rem",
              }}
            >
              DATA_SHEET
            </span>
            <h1
              style={{
                fontSize: "3rem",
                margin: 0,
                textTransform: "uppercase",
                fontWeight: "900",
              }}
            >
              {name}
            </h1>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "gold",
              border: "none",
              color: "black",
              padding: "12px 30px",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "4px",
              transition: "0.3s",
            }}
          >
            CLOSE_INSPECTION
          </button>
        </div>

        {/* CONTENEDOR DE IMÁGENES: EL PROTAGONISTA */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gap: "50px",
          }}
        >
          {/* BLOQUE MOTOR */}
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                color: "#444",
                textAlign: "left",
                letterSpacing: "3px",
                marginBottom: "15px",
              }}
            >
              01 // POWERPLANT UNIT
            </h3>
            <div
              style={{
                width: "100%",
                height: "70vh", // Esto hace que la foto ocupe el 70% de la altura de la pantalla
                borderRadius: "10px",
                overflow: "hidden",
                background: "#111",
                border: "1px solid #333",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              }}
            >
              <img
                src={data.engineImg}
                alt="Engine"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // CLAVE: La imagen se ve ENTERA sin cortarse
                  backgroundColor: "#000", // Rellena los bordes si la foto es de otra proporción
                }}
              />
            </div>
            <p
              style={{
                marginTop: "20px",
                color: "gold",
                fontSize: "1.2rem",
                maxWidth: "800px",
                margin: "20px auto",
              }}
            >
              {data.engineDesc}
            </p>
          </div>

          {/* BLOQUE INTERIOR */}
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                color: "#444",
                textAlign: "left",
                letterSpacing: "3px",
                marginBottom: "15px",
              }}
            >
              02 // INTERIOR ARCHITECTURE
            </h3>
            <div
              style={{
                width: "100%",
                height: "70vh", // Altura controlada
                borderRadius: "10px",
                overflow: "hidden",
                background: "#111",
                border: "1px solid #333",
              }}
            >
              <img
                src={data.interiorImg}
                alt="Interior"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // Se ve completa siempre
                }}
              />
            </div>
          </div>

          {/* BARRA DE SPECS FINAL */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2px",
              background: "#222",
              border: "1px solid #222",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                background: "#050505",
                padding: "30px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "gold",
                  display: "block",
                  fontSize: "0.7rem",
                  marginBottom: "10px",
                }}
              >
                HORSEPOWER
              </span>
              <span style={{ fontSize: "2rem" }}>{data.hp}</span>
            </div>
            <div
              style={{
                background: "#050505",
                padding: "30px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "gold",
                  display: "block",
                  fontSize: "0.7rem",
                  marginBottom: "10px",
                }}
              >
                MAX_SPEED
              </span>
              <span style={{ fontSize: "2rem" }}>{data.top}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </Section>
  );
}
