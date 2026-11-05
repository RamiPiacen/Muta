import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Arrow } from "../components/Icons";
import { SimpleHeader } from "../components/Header";
import { MaterialPhoto } from "../components/MaterialPhoto";
import { useCompare } from "../components/CompareContext";
import { getMaterial, type Capability, type Material } from "../data/materials";

function Lightbox({ images, name, index, onChange, onClose }: { images: string[]; name: string; index: number; onChange: (next: number) => void; onClose: () => void }) {
  const go = (step: number) => onChange((index + step + images.length) % images.length);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((index + 1) % images.length);
      if (event.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, onChange, onClose]);

  return (
    <div aria-label={`Galería de ${name}`} aria-modal="true" className="lightbox" onClick={onClose} role="dialog">
      <img alt={`${name}, imagen ${index + 1} de ${images.length}`} onClick={(event) => event.stopPropagation()} src={images[index]} />
      <button aria-label="Cerrar galería" className="lightbox-button right-5 top-5" onClick={onClose} type="button">
        ×
      </button>
      {images.length > 1 && (
        <>
          <button
            aria-label="Imagen anterior"
            className="lightbox-button left-5 top-1/2 -translate-y-1/2"
            onClick={(event) => {
              event.stopPropagation();
              go(-1);
            }}
            type="button"
          >
            ‹
          </button>
          <button
            aria-label="Imagen siguiente"
            className="lightbox-button right-5 top-1/2 -translate-y-1/2"
            onClick={(event) => {
              event.stopPropagation();
              go(1);
            }}
            type="button"
          >
            ›
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#eee6d4]/70">
            {index + 1} / {images.length}
          </p>
        </>
      )}
    </div>
  );
}

function ProcessRow({ label, capability }: { label: string; capability: Capability }) {
  const confirmed = capability.status === "si";
  return (
    <div>
      <span>
        {label}
        {capability.note && <small className="mt-1 block text-[11px] leading-snug text-[#3f3e34]/55">{capability.note}</small>}
      </span>
      <strong className={confirmed ? "" : "pending"}>{confirmed ? "Compatible" : "Por verificar"}</strong>
    </div>
  );
}

function contactLabel(url: string) {
  return url.includes("linkedin.com") ? "LinkedIn" : "Sitio web";
}

function ContactRows({ material }: { material: Material }) {
  const { web, email, whatsapp, instagram } = material.contact;
  return (
    <div className="min-w-[280px] space-y-3 text-sm">
      {web && (
        <a className="contact-row" href={web} rel="noreferrer" target="_blank">
          {contactLabel(web)} <Arrow diagonal />
        </a>
      )}
      {email && (
        <a className="contact-row" href={`mailto:${email}`}>
          {email} <Arrow diagonal />
        </a>
      )}
      {whatsapp && (
        <a className="contact-row" href={whatsapp.href} rel="noreferrer" target="_blank">
          WhatsApp · {whatsapp.label} <Arrow diagonal />
        </a>
      )}
      {instagram && (
        <a className="contact-row" href={instagram} rel="noreferrer" target="_blank">
          Instagram <Arrow diagonal />
        </a>
      )}
    </div>
  );
}

export default function MaterialDetail() {
  const { id } = useParams();
  const material = id ? getMaterial(id) : undefined;
  const compare = useCompare();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!material) {
    return (
      <main className="min-h-screen bg-[#eee6d4] text-[#3f3e34]">
        <SimpleHeader actionLabel="Volver a materiales" actionTo="/#materiales" />
        <section className="px-5 py-24 sm:px-8 lg:px-12">
          <p className="eyebrow mb-5 text-[#a65338]">Material no encontrado</p>
          <h1 className="font-serif text-[clamp(3.5rem,8vw,8rem)] leading-[0.85] tracking-[-0.05em]">No existe esta ficha.</h1>
          <Link className="primary-action mt-10" to={{ pathname: "/", hash: "#materiales" }}>
            Ver materiales <Arrow />
          </Link>
        </section>
      </main>
    );
  }

  const selected = compare.has(material.id);
  const cover = material.cover ?? material.images[0];
  const longName = material.name.length > 12;

  const specs: Array<[string, string]> = [
    ["Familia", material.family],
    ["Ubicación", material.location],
    ["Formatos", material.format],
    ["Espesor / gramaje", material.thickness],
    ["Composición", material.composition],
    ["Producción", material.produces],
  ];

  return (
    <main className="min-h-screen bg-[#eee6d4] text-[#3f3e34]">
      <SimpleHeader actionLabel="Cerrar ficha" actionTo="/#materiales" />

      <section className="px-5 pb-20 pt-8 sm:px-8 lg:px-12 lg:pb-28 lg:pt-12">
        <Link className="group mb-12 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em]" to={{ pathname: "/", hash: "#materiales" }}>
          <span className="rotate-180 transition-transform group-hover:translate-x-1">
            <Arrow />
          </span>
          Volver a materiales
        </Link>

        <div className="grid gap-10 border-b border-[#4b4d35]/25 pb-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-16">
          <div className="flex flex-col justify-between">
            <div>
              <p className="eyebrow mb-6 text-[#a65338]">Inventario preliminar · {material.number}</p>
              <h1
                className={`font-serif tracking-[-0.055em] ${
                  longName ? "text-[clamp(3rem,6vw,5.6rem)] leading-[0.86]" : "text-[clamp(5rem,11vw,10rem)] leading-[0.73]"
                }`}
              >
                {material.name}
              </h1>
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.13em] text-[#3f3e34]/65">
                {material.family} / {material.location}
              </p>
              <p className="mt-8 max-w-[560px] font-serif text-[clamp(1.65rem,3vw,2.55rem)] leading-[1.13]">{material.lead}</p>
            </div>
            <div className="mt-12 flex flex-col gap-5 border-t border-[#4b4d35]/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="h-3 w-3 shrink-0 rounded-[45%_55%_60%_40%]" style={{ background: material.color }} />
                <p className="text-xs leading-relaxed text-[#3f3e34]/60">Proveedor relevado para el inventario MUTA</p>
              </div>
              <button
                aria-pressed={selected}
                className={`compare-toggle mt-0! w-auto! border-t-0! pt-0! ${selected ? "is-selected" : ""}`}
                disabled={!selected && compare.isFull}
                onClick={() => compare.toggle(material.id)}
                type="button"
              >
                <span className="compare-check" aria-hidden="true">
                  {selected ? "✓" : "+"}
                </span>
                {selected ? "En comparación" : "Agregar a comparar"}
              </button>
            </div>
          </div>

          <div className="detail-hero relative min-h-[460px] overflow-hidden sm:min-h-[600px]">
            <MaterialPhoto alt={`Muestra de ${material.name}`} className="h-full w-full object-cover" material={material} src={cover} />
            <div className="absolute right-5 top-5 bg-[#eee6d4] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em]">Muestra {material.number}</div>
            <div className="absolute bottom-0 left-0 bg-[#5b5c40] p-5 text-[#eee6d4] sm:max-w-[300px]">
              <p className="eyebrow mb-2">Material</p>
              <p className="font-serif text-2xl leading-tight">{material.composition}</p>
            </div>
          </div>
        </div>

        <section className="border-b border-[#4b4d35]/25 py-14">
          <div className="mb-10 grid gap-5 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-4 text-[#a65338]">Ficha técnica / 02</p>
              <h2 className="font-serif text-[clamp(3.2rem,6vw,6rem)] leading-[0.86] tracking-[-0.04em]">
                Datos del
                <br />
                <em>material.</em>
              </h2>
            </div>
            <p className="max-w-[500px] self-end text-sm leading-[1.8] text-[#3f3e34]/65 lg:justify-self-end">
              Información preliminar relevada a partir de fuentes públicas del fabricante. Los datos pendientes se indican para su verificación.
            </p>
          </div>

          <dl className="spec-grid">
            {specs.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="grid gap-12 border-b border-[#4b4d35]/25 py-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow mb-7 text-[#a65338]">Procesabilidad / 03</p>
            <div className="process-list">
              <ProcessRow capability={material.cutting} label="Corte" />
              <ProcessRow capability={material.printing} label="Impresión / estampado" />
              <ProcessRow capability={material.engraving} label="Grabado" />
            </div>
            {material.extras && material.extras.length > 0 && (
              <ul className="mt-6 list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-[#3f3e34]/70">
                {material.extras.map((extra) => (
                  <li key={extra}>{extra}</li>
                ))}
              </ul>
            )}
            <p className="mt-6 text-xs leading-relaxed text-[#3f3e34]/55">
              “Por verificar” significa que todavía no tenemos el dato. No quiere decir que el material no sea compatible.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-7 text-[#a65338]">Aplicaciones / 04</p>
            <div className="application-list">
              {material.applications.map((application, index) => (
                <div key={application}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{application}</p>
                  <span className="text-[#a65338]">
                    <Arrow diagonal />
                  </span>
                </div>
              ))}
            </div>
            {material.notices && material.notices.length > 0 && (
              <div className="mt-6 space-y-2 text-xs leading-relaxed text-[#3f3e34]/55">
                {material.notices.map((notice) => (
                  <p key={notice}>{notice}</p>
                ))}
              </div>
            )}
          </div>
        </section>

        {material.variants && (
          <section className="border-b border-[#4b4d35]/25 py-14">
            <p className="eyebrow mb-4 text-[#a65338]">Variantes / 05</p>
            <h2 className="mb-10 font-serif text-[clamp(3rem,5vw,5rem)] leading-none">Tres materiales, una familia</h2>
            <div className="grid gap-5 lg:grid-cols-3">
              {material.variants.map((variant) => (
                <article className="border border-[#4b4d35]/25 p-6" key={variant.name}>
                  <h3 className="font-serif text-3xl leading-tight">{variant.name}</h3>
                  <p className="mt-4 text-xs text-[#3f3e34]/65">
                    {variant.format}
                    {variant.thickness ? ` · ${variant.thickness}` : ""}
                  </p>
                  <ul className="mt-5 list-disc space-y-1.5 border-t border-[#4b4d35]/20 pl-5 pt-5 text-sm leading-relaxed">
                    {variant.properties.map((property) => (
                      <li key={property}>{property}</li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#a65338]">Aplicaciones</p>
                  <p className="mt-1 text-sm">{variant.applications}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="py-14">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="eyebrow mb-4 text-[#a65338]">Superficies / {material.variants ? "06" : "05"}</p>
              <h2 className="font-serif text-[clamp(3rem,5vw,5rem)] leading-none">Imágenes del material</h2>
            </div>
            {material.images.length > 0 && <p className="hidden text-xs text-[#3f3e34]/50 sm:block">{material.images.length} imágenes</p>}
          </div>

          {material.images.length === 0 ? (
            <div className="border border-dashed border-[#4b4d35]/35 p-10 text-center">
              <p className="font-serif text-3xl">Las fotos de este material se incorporarán próximamente.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {material.images.map((image, index) => (
                <button
                  aria-label={`Ampliar imagen ${index + 1} de ${material.name}`}
                  className="gallery-thumb aspect-[4/3]"
                  key={image}
                  onClick={() => setLightboxIndex(index)}
                  type="button"
                >
                  <img alt={`${material.name}, imagen ${index + 1}`} loading="lazy" src={image} />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="texture grid gap-10 bg-[#a65338] p-7 text-[#eee6d4] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-14">
          <div>
            <p className="eyebrow mb-5 text-[#eee6d4]/65">Fuente y contacto</p>
            <h2 className="max-w-[760px] font-serif text-[clamp(2.8rem,6vw,6rem)] leading-[0.9]">¿Querés trabajar con este material?</h2>
          </div>
          <ContactRows material={material} />
        </section>
      </section>

      {lightboxIndex !== null && (
        <Lightbox images={material.images} index={lightboxIndex} name={material.name} onChange={setLightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </main>
  );
}
