import "./TabButton.css";

// AJUSTE DE ÉLITE: El componente se mantiene puro para que el CSS maneje toda la elegancia
export default function TabButton({ children, onSelect, isSelected }) {
  return (
    <li>
      <button
        className={`tab-button ${isSelected ? "active" : ""}`}
        onClick={onSelect}
      >
        {children}
      </button>
    </li>
  );
}
