import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Al cambiar de ruta vuelve arriba; si la URL tiene #ancla, baja hasta esa sección */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}
