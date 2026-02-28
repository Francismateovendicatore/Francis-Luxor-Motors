import { useState } from "react";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='800' height='500' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23555' font-size='22' font-family='sans-serif'%3EImage Not Available%3C/text%3E%3C/svg%3E";

export default function CarImage({ src, alt, className, style }) {
  const [imgSrc, setImgSrc] = useState(`/assets/${src}`);
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={imgSrc}
      alt={alt || "Luxury Car"}
      className={className}
      style={style}
      loading="lazy"
      onError={() => { if (!hasError) { setHasError(true); setImgSrc(PLACEHOLDER); } }}
    />
  );
}
