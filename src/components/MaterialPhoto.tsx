import type { Material } from "../data/materials";

/** Foto del material; si todavía no hay fotos muestra un bloque de color con aviso */
export function MaterialPhoto({ material, src, alt, className = "" }: { material: Material; src?: string; alt: string; className?: string }) {
  if (!src) {
    return (
      <div className={`texture ${className}`} style={{ background: material.color }} role="img" aria-label={`${material.name}: foto próximamente`}>
        <span className="photo-placeholder">Foto próximamente</span>
      </div>
    );
  }
  return <img alt={alt} className={className} loading="lazy" src={src} />;
}
