/* =====================================================
   IMPORTACIÓN DE RECURSOS (IMÁGENES)
   -----------------------------------------------------
   Aquí se importan las imágenes desde la carpeta assets.
   Cada import guarda la imagen en una variable que
   luego se usará dentro del array de datos.
   ===================================================== */
import Bugatti from "./assets/Screenshot 2025-12-19 210503.png";
import FerrariRoma from "./assets/Screenshot 2025-12-19 232440.png";
import PaganiHuayra from "./assets/Screenshot 2025-12-19 233008.png";
import RollsRoyce from "./assets/Screenshot 2025-12-19 233340.png";
import ToyotaSupra from "./assets/Screenshot 2025-12-20 153558.png";
import KoenigseggRegera from "./assets/Screenshot 2025-12-21 184431.png";
import LamborghiniVeneno from "./assets/Screenshot 2025-12-21 184653.png";
import AstonMartinValkyrie from "./assets/Screenshot 2025-12-21 185355.png";
import HennesseyVenomF5 from "./assets/Screenshot 2025-12-31 134042.png";

/* =====================================================
   COLECCIÓN PRINCIPAL DE DATOS
   -----------------------------------------------------
   CORE_COLLECTION es un array de objetos.
   Cada objeto representa un vehículo.
   Esta estructura permite recorrer los datos
   dinámicamente con .map() en React.
   ===================================================== */

export const CORE_COLLECTION = [
  /* ---------- BUGATTI CHIRON ---------- */
  {
    id: "bugatti-chiron", // Identificador único
    src: Bugatti, // Imagen importada
    model: "Bugatti Chiron",
    valuation: "€4,000,000",
    stock: "5 Units Available",
    description:
      "The pinnacle of automotive engineering featuring a quad-turbocharged W16 powerplant and unparalleled luxury.",
  },

  /* ---------- FERRARI ROMA ---------- */
  {
    id: "ferrari-roma",
    src: FerrariRoma,
    model: "Ferrari Roma",
    valuation: "€300,000",
    stock: "15 Units Available",
    description:
      "A contemporary representation of the 'La Nuova Dolce Vita', combining timeless elegance with a high-performance V8.",
  },

  /* ---------- PAGANI HUAYRA ---------- */
  {
    id: "pagani-huayra",
    src: PaganiHuayra,
    model: "Pagani Huayra",
    valuation: "€3,000,000",
    stock: "3 Units Available",
    description:
      "A masterful fusion of art and science, handcrafted with an AMG-sourced V12 and active aerodynamics.",
  },

  /* ---------- ROLLS-ROYCE PHANTOM ---------- */
  {
    id: "rolls-royce-phantom",
    src: RollsRoyce,
    model: "Rolls-Royce Phantom",
    valuation: "€450,000",
    stock: "5 Units Available",
    description:
      "The definitive symbol of opulence and bespoke craftsmanship, offering an effortless 'Magic Carpet Ride'.",
  },

  /* ---------- TOYOTA SUPRA MK5 ---------- */
  {
    id: "toyota-supra-mk5",
    src: ToyotaSupra,
    model: "Toyota Supra MK5",
    valuation: "€400,000",
    stock: "9 Units Available",
    description:
      "Precision-engineered sports performance featuring a signature straight-six turbocharged engine and track-focused agility.",
  },

  /* ---------- KOENIGSEGG REGERA ---------- */
  {
    id: "koenigsegg-regera",
    src: KoenigseggRegera,
    model: "Koenigsegg Regera",
    valuation: "€4,000,000",
    stock: "1 Unit Available",
    description:
      "An innovative plug-in hybrid megacar utilizing the Direct Drive system to redefine hypercar acceleration.",
  },

  /* ---------- LAMBORGHINI VENENO ---------- */
  {
    id: "lamborghini-veneno",
    src: LamborghiniVeneno,
    model: "Lamborghini Veneno",
    valuation: "€9,000,000",
    stock: "2 Units Available",
    description:
      "An ultra-exclusive tribute to aeronautical design, pushing the boundaries of the naturally aspirated V12.",
  },

  /* ---------- ASTON MARTIN VALKYRIE ---------- */
  {
    id: "aston-martin-valkyrie",
    src: AstonMartinValkyrie,
    model: "Aston Martin Valkyrie",
    valuation: "€2,500,000",
    stock: "8 Units Available",
    description:
      "Born from a collaboration with Red Bull Racing, this F1-inspired masterpiece delivers raw, track-oriented performance.",
  },

  /* ----------  HENNESSEY VENOM F5---------- */
  {
    id: " Hennessey-Venom-F5",
    src: HennesseyVenomF5,
    model: " Hennessey Venom F5",
    valuation: "€1,850,000",
    stock: "2 Units Available",
    description:
      "The Hennessey Venom F5 is an ultra-high-performance hypercar built for extreme speed. It uses a carbon-fiber chassis and a twin-turbo V8 engine producing over 1,800 horsepower, with rear-wheel drive and advanced aerodynamics.",
  },
];
