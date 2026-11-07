import { Arrow, Brand } from "./Icons";

export function Footer() {
  return (
    <footer className="texture bg-[#904F2F] px-5 py-14 text-[#E0D9C7] sm:px-8 lg:px-12 lg:py-20" id="contacto">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Brand light />
          <p className="mt-5 max-w-[300px] text-sm leading-relaxed text-[#E0D9C7]/70">Materiales sustentables para diseñar lo que sigue.</p>
        </div>
        <div>
          <p className="eyebrow mb-5">¿Tenés un material o un proyecto?</p>
          <a
            className="group flex items-end justify-between border-b border-[#E0D9C7]/50 pb-4 font-serif text-[clamp(2.4rem,5vw,5.4rem)] leading-none"
            href="mailto:hola@muta.ar"
          >
            Hablemos.
            <span className="mb-1 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
              <Arrow diagonal />
            </span>
          </a>
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-3 border-t border-[#E0D9C7]/25 pt-5 text-[10px] uppercase tracking-[0.16em] text-[#E0D9C7]/60 sm:flex-row sm:justify-between">
        <p>© 2026 MUTA</p>
        <p>Diseño · materia · transformación</p>
      </div>
    </footer>
  );
}
