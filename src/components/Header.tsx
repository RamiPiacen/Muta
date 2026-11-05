import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Arrow, Brand } from "./Icons";
import { useCompare } from "./CompareContext";

const sectionLinks = [
  { label: "Materiales", hash: "#materiales" },
  { label: "Manifiesto", hash: "#manifiesto" },
  { label: "Nosotros", hash: "#nosotros" },
];

/** Cabecera principal del sitio (fija, con navegación y menú mobile) */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { ids } = useCompare();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[76px] items-center justify-between border-b border-[#4b4d35]/15 bg-[#eee6d4]/92 px-5 backdrop-blur-md sm:px-8 lg:px-12">
      <Link to="/" aria-label="MUTA, inicio">
        <Brand />
      </Link>

      <nav className="hidden items-center gap-9 text-[11px] font-bold uppercase tracking-[0.16em] md:flex" aria-label="Navegación principal">
        <Link className="nav-link" to={{ pathname: "/", hash: "#materiales" }}>
          Materiales
        </Link>
        <NavLink className={({ isActive }) => `nav-link inline-flex items-center gap-2 ${isActive ? "is-active" : ""}`} to="/comparar">
          Comparar
          <span className="comparison-count">{ids.length}</span>
        </NavLink>
        <Link className="nav-link" to={{ pathname: "/", hash: "#manifiesto" }}>
          Manifiesto
        </Link>
        <Link className="nav-link" to={{ pathname: "/", hash: "#nosotros" }}>
          Nosotros
        </Link>
      </nav>

      <Link
        className="hidden items-center gap-2 border-b border-current pb-1 text-[11px] font-bold uppercase tracking-[0.16em] transition-opacity hover:opacity-60 md:flex"
        to={{ pathname: "/", hash: "#contacto" }}
      >
        Contacto <Arrow diagonal />
      </Link>

      <button
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        className="flex h-10 w-10 items-center justify-center md:hidden"
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >
        <span className="relative h-4 w-5">
          <span className={`menu-line top-0 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`menu-line top-[7px] ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`menu-line top-[14px] ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </span>
      </button>

      <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegación móvil">
        {sectionLinks.map(({ label, hash }) => (
          <Link key={label} onClick={() => setMenuOpen(false)} to={{ pathname: "/", hash }}>
            {label}
          </Link>
        ))}
        <Link onClick={() => setMenuOpen(false)} to={{ pathname: "/", hash: "#contacto" }}>
          Contacto
        </Link>
        <Link className="mobile-compare" onClick={() => setMenuOpen(false)} to="/comparar">
          Comparar materiales <span>{ids.length}</span>
        </Link>
      </nav>
    </header>
  );
}

/** Cabecera simple para la ficha de material y el comparador */
export function SimpleHeader({ actionLabel, actionTo }: { actionLabel: string; actionTo: string }) {
  return (
    <header className="flex h-[76px] items-center justify-between border-b border-[#4b4d35]/15 px-5 sm:px-8 lg:px-12">
      <Link to="/" aria-label="MUTA, inicio">
        <Brand />
      </Link>
      <Link className="detail-close" to={actionTo}>
        {actionLabel}
        <span aria-hidden="true">×</span>
      </Link>
    </header>
  );
}
