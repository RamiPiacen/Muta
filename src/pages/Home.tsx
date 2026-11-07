import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Arrow, Contours } from "../components/Icons";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MaterialPhoto } from "../components/MaterialPhoto";
import { useCompare } from "../components/CompareContext";
import { FAMILY_GROUPS, PROCESS_FILTERS, materials, type ProcessFilter } from "../data/materials";

const ALL_FAMILIES = "Todas";
const ALL_PROCESSES = "Todos";

const processKey = {
  Corte: "cutting",
  Impresión: "printing",
  Grabado: "engraving",
} as const satisfies Record<ProcessFilter, "cutting" | "printing" | "engraving">;

export default function Home() {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<string>(ALL_FAMILIES);
  const [process, setProcess] = useState<string>(ALL_PROCESSES);
  const compare = useCompare();

  const visibleMaterials = useMemo(() => {
    const text = query.trim().toLowerCase();
    return materials.filter((material) => {
      const haystack = `${material.name} ${material.family} ${material.location} ${material.composition} ${material.produces}`.toLowerCase();
      const matchesQuery = haystack.includes(text);
      const matchesFamily = family === ALL_FAMILIES || material.familyGroup === family;
      // Solo se muestran los procesos validados: "sin dato" nunca equivale a "no compatible"
      const matchesProcess = process === ALL_PROCESSES || material[processKey[process as ProcessFilter]].status === "si";
      return matchesQuery && matchesFamily && matchesProcess;
    });
  }, [family, process, query]);

  const filtersActive = query !== "" || family !== ALL_FAMILIES || process !== ALL_PROCESSES;
  const resetFilters = () => {
    setQuery("");
    setFamily(ALL_FAMILIES);
    setProcess(ALL_PROCESSES);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#E0D9C7] text-[#403A2F]">
      <Header />

      <section className="grid min-h-[760px] pt-[76px] lg:grid-cols-[1.15fr_.85fr]" id="inicio">
        <div className="hero-material relative min-h-[580px] overflow-hidden lg:min-h-[684px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3A3429]/72 via-[#4A4234]/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-[#F1ECDD] sm:p-10 lg:p-12">
            <p className="eyebrow mb-5">Materiales sustentables para diseño</p>
            <h1 className="max-w-[790px] font-serif text-[clamp(4.4rem,9vw,9.5rem)] leading-[1] tracking-[-0.055em]">
              Explorá.
              <br />
              Compará.
              <br />
              <em>Diseñá distinto.</em>
            </h1>
          </div>
          <div className="absolute left-[48%] top-12 hidden h-36 w-36 rotate-12 rounded-[42%_58%_63%_37%] border border-[#E0D9C7]/50 lg:block" />
        </div>

        <div className="texture relative flex flex-col justify-between bg-[#904F2F] px-6 py-12 text-[#E0D9C7] sm:px-10 lg:px-12 lg:py-16">
          <div className="pointer-events-none absolute inset-0 opacity-[0.09]">
            <Contours />
          </div>
          <div className="relative flex items-center justify-between">
            <span className="eyebrow">MUTA / 2026</span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#E0D9C7]" />
          </div>
          <div className="relative my-16">
            <p className="font-serif text-[clamp(3rem,5.5vw,6rem)] leading-[0.92] tracking-[-0.035em]">
              Muta la forma
              <br />
              de diseñar.
            </p>
            <div className="my-8 h-px w-12 bg-current" />
            <p className="max-w-[390px] text-sm leading-[1.9] tracking-[0.04em] text-[#E0D9C7]/82 sm:text-base">
              Una plataforma y materialoteca que conecta a diseñadores con alternativas de materiales sustentables.
            </p>
          </div>
          <a className="relative flex items-center justify-between border-t border-[#E0D9C7]/35 pt-5 text-xs font-bold uppercase tracking-[0.18em]" href="#materiales">
            Ver materialoteca <Arrow />
          </a>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28" id="materiales">
        <div className="mb-10 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow mb-5 text-[#904F2F]">Materialoteca / 01</p>
            <h2 className="font-serif text-[clamp(3.6rem,7vw,7.2rem)] leading-[0.85] tracking-[-0.05em]">
              Materia que
              <br />
              <em>abre caminos.</em>
            </h2>
          </div>
          <div className="flex flex-col gap-7 lg:items-end">
            <p className="max-w-[470px] text-sm leading-[1.8] text-[#403A2F]/70 lg:text-right">
              Una selección curada de superficies, fibras y compuestos para proyectos que buscan reducir su impacto sin resignar identidad.
            </p>
          </div>
        </div>

        <div className="filter-panel texture mb-12">
          <div className="relative">
            <svg className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#403A2F]/45" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
            </svg>
            <input
              aria-label="Buscar material, familia o ubicación"
              className="filter-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar material, familia o ubicación..."
              type="search"
              value={query}
            />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="filter-field">
              <span>Familia</span>
              <select onChange={(event) => setFamily(event.target.value)} value={family}>
                {[ALL_FAMILIES, ...FAMILY_GROUPS].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="filter-field">
              <span>Procesabilidad confirmada</span>
              <select onChange={(event) => setProcess(event.target.value)} value={process}>
                {[ALL_PROCESSES, ...PROCESS_FILTERS].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#5A5142]/15 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#403A2F]/50">
              {visibleMaterials.length} {visibleMaterials.length === 1 ? "material encontrado" : "materiales encontrados"}
            </p>
            <button className={`reset-button ${filtersActive ? "" : "invisible"}`} onClick={resetFilters} type="button">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 6a5 5 0 1 1 .2 4.4M3 6V2.5M3 6h3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
              </svg>
              Restablecer
            </button>
          </div>
          {process !== ALL_PROCESSES && (
            <p className="mt-3 text-xs leading-relaxed text-[#403A2F]/55">
              El filtro muestra solo los materiales con ese proceso confirmado. Los que figuran como “por verificar” no se descartan: todavía no tenemos el dato.
            </p>
          )}
        </div>

        <div className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visibleMaterials.map((material) => {
            const selected = compare.has(material.id);
            const cover = material.cover ?? material.images[0];
            return (
              <article className="material-card group text-left" key={material.id}>
                <Link className="material-card-link" to={`/materiales/${material.id}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#C0A886]">
                    <MaterialPhoto
                      alt={`Muestra de ${material.name}`}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      material={material}
                      src={cover}
                    />
                    <span className="absolute left-4 top-4 bg-[#E0D9C7] px-2.5 py-1 text-[10px] font-bold tracking-[0.14em]">{material.number}</span>
                    <div className="absolute bottom-4 right-4 h-10 w-10 rounded-[42%_58%_63%_37%]" style={{ background: material.color }} />
                  </div>
                  <div className="flex items-start justify-between border-t border-[#5A5142]/25 pt-4">
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#904F2F]">{material.family}</p>
                      <h3 className="font-serif text-3xl tracking-[-0.025em]">{material.name}</h3>
                      <p className="mt-2 text-xs text-[#403A2F]/58">
                        {material.composition} · {material.location}
                      </p>
                    </div>
                    <span className="mt-2 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                      <Arrow diagonal />
                    </span>
                  </div>
                </Link>
                <button
                  aria-pressed={selected}
                  className={`compare-toggle ${selected ? "is-selected" : ""}`}
                  disabled={!selected && compare.isFull}
                  onClick={() => compare.toggle(material.id)}
                  type="button"
                >
                  <span className="compare-check" aria-hidden="true">
                    {selected ? "✓" : "+"}
                  </span>
                  {selected ? "En comparación" : "Agregar a comparar"}
                </button>
              </article>
            );
          })}
        </div>

        {compare.isFull && <p className="mt-8 text-xs text-[#403A2F]/55">Ya elegiste 3 materiales, el máximo para comparar. Quitá uno para sumar otro.</p>}

        {visibleMaterials.length === 0 && (
          <div className="border-y border-[#5A5142]/20 py-20 text-center">
            <p className="font-serif text-4xl">No encontramos materiales.</p>
            <button className="reset-button mt-5" onClick={resetFilters} type="button">
              Restablecer filtros
            </button>
          </div>
        )}
      </section>

      <section className="grid bg-[#6F6542] text-[#E0D9C7] lg:grid-cols-2" id="manifiesto">
        <div className="contour-panel relative min-h-[500px] overflow-hidden border-b border-[#E0D9C7]/20 p-6 sm:p-10 lg:min-h-[700px] lg:border-b-0 lg:border-r lg:p-12">
          <div className="absolute inset-0 opacity-75">
            <Contours />
          </div>
          <div className="relative flex h-full flex-col justify-between">
            <p className="eyebrow">Manifiesto / 02</p>
            <div className="self-center rounded-[48%_52%_39%_61%] bg-[#904F2F] px-8 py-12 text-center font-serif text-2xl sm:px-12 sm:py-16 sm:text-3xl">
              pensar
              <br />
              hacer
              <br />
              transformar
            </div>
            <p className="max-w-[260px] text-xs leading-[1.8] text-[#E0D9C7]/65">La materia no es el final del proceso. Es el lugar donde empieza una nueva pregunta.</p>
          </div>
        </div>

        <div className="texture flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-16" id="nosotros">
          <p className="eyebrow mb-8 text-[#C0A886]">Nuestra mirada</p>
          <blockquote className="font-serif text-[clamp(3.2rem,6vw,6.8rem)] leading-[0.88] tracking-[-0.045em]">
            “Diseñar también es elegir qué mundo <em>hacemos posible.</em>”
          </blockquote>
          <div className="mt-12 grid gap-7 border-t border-[#E0D9C7]/25 pt-8 text-sm leading-[1.8] text-[#E0D9C7]/72 sm:grid-cols-2">
            <p>MUTA nace para acercar información clara, sensible y accionable sobre nuevos materiales.</p>
            <p>Conectamos industria, investigación y diseño para acelerar decisiones más conscientes.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
