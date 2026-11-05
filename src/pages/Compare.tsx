import { Link } from "react-router-dom";
import { Arrow, Contours } from "../components/Icons";
import { SimpleHeader } from "../components/Header";
import { MaterialPhoto } from "../components/MaterialPhoto";
import { MAX_COMPARE, useCompare } from "../components/CompareContext";
import { capabilityText, isPending, type Material } from "../data/materials";

const rows: Array<{ label: string; value: (material: Material) => string }> = [
  { label: "Familia", value: (m) => m.family },
  { label: "Ubicación", value: (m) => m.location },
  { label: "Composición", value: (m) => m.composition },
  { label: "Qué produce", value: (m) => m.produces },
  { label: "Formato", value: (m) => m.format },
  { label: "Espesor / gramaje", value: (m) => m.thickness },
  { label: "Corte", value: (m) => capabilityText(m.cutting) },
  { label: "Impresión / estampado", value: (m) => capabilityText(m.printing) },
  { label: "Grabado", value: (m) => capabilityText(m.engraving) },
  { label: "Aplicaciones", value: (m) => m.applications.join(", ") },
];

export default function Compare() {
  const { selected, remove } = useCompare();

  return (
    <main className="min-h-screen bg-[#eee6d4] text-[#3f3e34]">
      <SimpleHeader actionLabel="Volver al inicio" actionTo="/" />

      <section className="px-5 pb-20 pt-10 sm:px-8 lg:px-12 lg:pb-28 lg:pt-16">
        <div className="grid gap-8 border-b border-[#4b4d35]/25 pb-10 lg:grid-cols-[1fr_.75fr] lg:items-end">
          <div>
            <p className="eyebrow mb-5 text-[#a65338]">Comparador / 01</p>
            <h1 className="font-serif text-[clamp(4.2rem,9vw,9rem)] leading-[0.76] tracking-[-0.055em]">
              Compará.
              <br />
              <em>Elegí mejor.</em>
            </h1>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-[470px] text-sm leading-[1.8] text-[#3f3e34]/68">
              Poné los datos técnicos en contexto y encontrá el material que mejor responde a las necesidades de tu proyecto.
            </p>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.17em] text-[#a65338]">
              {selected.length} de {MAX_COMPARE} materiales seleccionados
            </p>
          </div>
        </div>

        {selected.length === 0 ? (
          <div className="comparison-empty texture relative mt-10 overflow-hidden border border-[#4b4d35]/20">
            <div className="absolute inset-y-0 right-0 hidden w-1/2 text-[#5b5c40]/12 lg:block">
              <Contours />
            </div>
            <div className="relative max-w-[720px] p-7 sm:p-12 lg:p-16">
              <span className="mb-10 block h-4 w-4 rounded-[45%_55%_60%_40%] bg-[#a65338]" />
              <p className="eyebrow mb-5 text-[#a65338]">Tu mesa está vacía</p>
              <h2 className="font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.88] tracking-[-0.04em]">
                Primero elegí los materiales que querés poner <em>lado a lado.</em>
              </h2>
              <p className="mt-7 max-w-[520px] text-sm leading-[1.8] text-[#3f3e34]/65">
                Explorá la materialoteca y usá el botón “Agregar a comparar” en hasta tres materiales.
              </p>
              <Link className="primary-action mt-9" to={{ pathname: "/", hash: "#materiales" }}>
                Ver materiales <Arrow />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {selected.length === 1 && (
              <div className="mt-8 flex flex-col gap-4 border border-[#a65338]/30 bg-[#a65338]/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm">
                  <strong>Sumá al menos un material más</strong> para comenzar a comparar sus propiedades.
                </p>
                <Link className="reset-button shrink-0" to={{ pathname: "/", hash: "#materiales" }}>
                  Agregar material
                </Link>
              </div>
            )}

            <div className="comparison-scroll mt-10 overflow-x-auto">
              <div className={`comparison-table count-${selected.length}`}>
                <div className="comparison-label-head">
                  <p className="eyebrow">Propiedad</p>
                </div>
                {selected.map((material, index) => (
                  <div className="comparison-material-head" key={material.id}>
                    <Link className="relative block aspect-[4/3] overflow-hidden" to={`/materiales/${material.id}`}>
                      <MaterialPhoto
                        alt={`Muestra de ${material.name}`}
                        className="h-full w-full object-cover"
                        material={material}
                        src={material.cover ?? material.images[0]}
                      />
                      <span className="absolute left-3 top-3 bg-[#eee6d4] px-2 py-1 text-[9px] font-bold tracking-[0.14em]">0{index + 1}</span>
                    </Link>
                    <div className="flex items-start justify-between gap-4 pt-4">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#a65338]">{material.family}</p>
                        <h2 className="mt-1 font-serif text-3xl">{material.name}</h2>
                      </div>
                      <button
                        aria-label={`Quitar ${material.name} de la comparación`}
                        className="remove-compare"
                        onClick={() => remove(material.id)}
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}

                {rows.map((row) => (
                  <div className="contents" key={row.label}>
                    <div className="comparison-row-label">{row.label}</div>
                    {selected.map((material) => {
                      const value = row.value(material);
                      return (
                        <div className={`comparison-value ${isPending(value) ? "is-pending" : ""}`} key={`${material.id}-${row.label}`}>
                          {value}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-5 border-t border-[#4b4d35]/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[620px] text-xs leading-[1.7] text-[#3f3e34]/52">
                La comparación utiliza información preliminar. “Por verificar” o “por solicitar” indican datos que todavía no están confirmados por el fabricante; no significan que el material no sea compatible.
              </p>
              {selected.length < MAX_COMPARE && (
                <Link className="primary-action shrink-0" to={{ pathname: "/", hash: "#materiales" }}>
                  Sumar material <Arrow />
                </Link>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
