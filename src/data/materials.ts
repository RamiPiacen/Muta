/**
 * Inventario preliminar de materiales MUTA.
 * Fuente: "Materialoteca investigación y web" (documento preliminar).
 * Regla del inventario: "sin dato" nunca equivale a "no compatible".
 * Un dato que no está confirmado se marca como `verificar`.
 */

export type Status = "si" | "verificar";

export type Capability = {
  status: Status;
  note?: string;
};

export type Variant = {
  name: string;
  format: string;
  thickness?: string;
  properties: string[];
  applications: string;
};

export type Contact = {
  web?: string;
  email?: string;
  whatsapp?: { label: string; href: string };
  instagram?: string;
  linkedin?: string;
};

export type Material = {
  /** Identificador para la URL (/materiales/:id) */
  id: string;
  /** Número en el inventario preliminar (el 07 no existe en el documento) */
  number: string;
  name: string;
  /** Familia tal como figura en el documento */
  family: string;
  /** Familia agrupada para el filtro del buscador */
  familyGroup: FamilyGroup;
  location: string;
  /** Una frase que resume qué produce */
  lead: string;
  produces: string;
  composition: string;
  format: string;
  thickness: string;
  cutting: Capability;
  printing: Capability;
  engraving: Capability;
  applications: string[];
  /** Datos adicionales verificados o declarados (beneficios, costura, moldeo…) */
  extras?: string[];
  /** Avisos sobre el estado del dato */
  notices?: string[];
  variants?: Variant[];
  contact: Contact;
  /** Color de acento de la tarjeta */
  color: string;
  /** Archivo de portada (dentro de `images`) */
  cover?: string;
  /** Galería completa. Vacía si todavía no hay fotos. */
  images: string[];
};

export const FAMILY_GROUPS = [
  "Plásticos reciclados",
  "Biomateriales y biotextiles",
  "Papel y cartón",
  "Textiles y no tejidos",
  "Packaging flexible",
  "Material alternativo",
] as const;

export type FamilyGroup = (typeof FAMILY_GROUPS)[number];

export const PROCESS_FILTERS = ["Corte", "Impresión", "Grabado"] as const;
export type ProcessFilter = (typeof PROCESS_FILTERS)[number];

/** Arma las rutas de imagen: photos("stapa", 5) -> stapa-01.webp … stapa-05.webp */
const photos = (slug: string, count: number, skip: number[] = []) =>
  Array.from({ length: count }, (_, i) => i + 1)
    .filter((n) => !skip.includes(n))
    .map((n) => `/materiales/${slug}/${slug}-${String(n).padStart(2, "0")}.webp`);

const photo = (slug: string, n: number) => `/materiales/${slug}/${slug}-${String(n).padStart(2, "0")}.webp`;

const si = (note?: string): Capability => ({ status: "si", note });
const verificar = (note?: string): Capability => ({ status: "verificar", note });

export const materials: Material[] = [
  {
    id: "stapa",
    number: "01",
    name: "STAPA",
    family: "Plásticos reciclados",
    familyGroup: "Plásticos reciclados",
    location: "Córdoba",
    lead: "Placas de PEAD y PS reciclados que transforman residuos plásticos en superficies resistentes y expresivas.",
    produces: "Placas de PEAD y PS reciclados",
    composition: "PEAD y PS reciclados",
    format: "Placas de 100 × 100 cm; baldosas de 30 × 30 y 60 × 30 cm",
    thickness: "4–12 mm",
    cutting: si("método no detallado"),
    printing: verificar(),
    engraving: verificar(),
    applications: ["Cartelería interior", "Exhibidores", "Mobiliario", "Revestimiento interior"],
    notices: ["Cartelería interior y exhibidores son aplicaciones potenciales; mobiliario y revestimiento interior son usos declarados."],
    contact: {
      web: "https://somos-stapa.com/producto",
      email: "somos.stapa@gmail.com",
      whatsapp: { label: "+54 9 2901 15514737", href: "https://wa.me/549290115514737" },
    },
    color: "#a65338",
    cover: photo("stapa", 3),
    images: photos("stapa", 5),
  },
  {
    id: "atlantico-marsinplast",
    number: "02",
    name: "Proyecto Atlántico / Marsinplast",
    family: "Plásticos reciclados",
    familyGroup: "Plásticos reciclados",
    location: "Mar del Plata",
    lead: "Placas rígidas obtenidas de redes de pesca recuperadas.",
    produces: "Placas rígidas obtenidas de redes de pesca recuperadas",
    composition: "Redes de pesca recuperadas",
    format: "Rectángulos de 66 × 36 cm",
    thickness: "6, 10 y 20 mm",
    cutting: si(),
    printing: si(),
    engraving: si(),
    applications: ["Señalética", "Piezas rígidas", "Cartelería"],
    contact: {
      web: "https://ar.linkedin.com/company/marsinplast",
      whatsapp: { label: "+54 223 6 995847", href: "https://tr.ee/GScpiIgEFF" },
      instagram: "https://www.instagram.com/atlantico_mdq",
    },
    color: "#5b8a85",
    cover: photo("atlantico-marsinplast", 8),
    images: photos("atlantico-marsinplast", 8),
  },
  {
    id: "uso-revium",
    number: "03",
    name: "+USO / Revium",
    family: "Biotextiles",
    familyGroup: "Biomateriales y biotextiles",
    location: "Mar del Plata",
    lead: "Láminas de celulosa bacteriana elaboradas con residuos orgánicos locales, en líneas de colores y texturas.",
    produces: "Láminas de celulosa bacteriana con residuos orgánicos locales",
    composition: "Celulosa bacteriana con residuos orgánicos locales",
    format: "Láminas; líneas de colores y texturas",
    thickness: "Por solicitar (espesor y gramaje)",
    cutting: si(),
    printing: verificar("impresión y estampado"),
    engraving: si(),
    applications: ["Packaging premium", "Etiquetas", "Encuadernación", "Accesorios"],
    extras: ["Costura: declarada"],
    notices: ["Compostabilidad: en validación."],
    contact: {
      web: "https://www.masuso.com.ar/",
      email: "info.masuso@gmail.com",
      whatsapp: { label: "+54 9 223 6348021", href: "https://wa.me/5492236348021" },
      instagram: "https://www.instagram.com/mas.uso",
    },
    color: "#8a5a35",
    cover: photo("uso-revium", 1),
    // Se omiten 11, 13 y 14: son recortes incompletos de la foto original.
    images: photos("uso-revium", 15, [11, 13, 14]),
  },
  {
    id: "mosh-packaging",
    number: "04",
    name: "MOSH Packaging",
    family: "Biomateriales",
    familyGroup: "Biomateriales y biotextiles",
    location: "Buenos Aires",
    lead: "Packaging moldeado de micelio y residuos agrícolas, diseñado a medida.",
    produces: "Packaging moldeado de micelio y residuos agrícolas",
    composition: "Micelio y residuos agrícolas",
    format: "Piezas a medida",
    thickness: "No corresponde gramaje plano estándar",
    cutting: si("corte posterior"),
    printing: si(),
    engraving: si(),
    applications: ["Protección de botellas", "Velas", "Cosmética", "Productos frágiles"],
    extras: [
      "Moldeo a medida: sí",
      "Aislamiento térmico",
      "Protección contra impactos",
      "Ligero",
      "Hidrofóbico y retardante al fuego",
      "100% compostable",
      "Diseño personalizado",
    ],
    contact: {
      web: "https://somos-mosh.com/packaging/",
      email: "info@somos-mosh.com",
      whatsapp: { label: "+54 9 11 3017-2445", href: "https://wa.me/5491130172445" },
      instagram: "https://www.instagram.com/mosh.micelio",
    },
    color: "#b99a6b",
    cover: photo("mosh-packaging", 2),
    images: photos("mosh-packaging", 16),
  },
  {
    id: "biomat-lab",
    number: "05",
    name: "BIOMAT.LAB",
    family: "Biomateriales",
    familyGroup: "Biomateriales y biotextiles",
    location: "Córdoba",
    lead: "Biomateriales desarrollados a partir de descartes orgánicos.",
    produces: "Biomateriales desarrollados con descartes orgánicos",
    composition: "Descartes orgánicos (según formulación)",
    format: "Por solicitar",
    thickness: "Depende de la formulación; por solicitar",
    cutting: verificar("por ensayar o consultar"),
    printing: verificar("por ensayar o consultar"),
    engraving: verificar("por ensayar o consultar"),
    applications: ["Indumentaria", "Interiorismo", "Arte funcional"],
    notices: ["Indumentaria, interiorismo y arte funcional son usos declarados; el uso gráfico es experimental."],
    contact: {
      web: "https://biomatlab.ar/",
      email: "biomatlab.ar@gmail.com",
      instagram: "https://www.instagram.com/bio.mat.lab",
    },
    color: "#4b4d35",
    cover: photo("biomat-lab", 1),
    images: photos("biomat-lab", 9),
  },
  {
    id: "etimo",
    number: "06",
    name: "ETIMO Biomateriales",
    family: "Biomateriales",
    familyGroup: "Biomateriales y biotextiles",
    location: "Argentina",
    lead: "Materiales biodegradables desarrollados con residuos orgánicos como algas y borra de café.",
    produces: "Materiales biodegradables con residuos orgánicos",
    composition: "Algas y borra de café",
    format: "Plancha de 80 × 60 cm (algas y borra); plancha de 28 × 28 cm (goma espuma de borra); rígido: por consultar",
    thickness: "1 mm (algas y borra); 8 mm (goma espuma de borra)",
    cutting: verificar(),
    printing: verificar(),
    engraving: si("grabado láser"),
    applications: ["Luminaria", "Cartelería", "Packaging", "Revestimiento", "Objetos"],
    extras: ["Se puede pegar", "Se puede coser (la costura no resiste peso)"],
    notices: ["Las aplicaciones gráficas (luminaria, cartelería) son posibles; el análisis acústico está en proceso."],
    variants: [
      {
        name: "Algas y borra de café",
        format: "Planchas de 80 × 60 cm",
        thickness: "1 mm",
        properties: [
          "100% biodegradable",
          "Flexible y translúcido, texturado con borra",
          "No es impermeable",
          "Resiste calor hasta 85 °C",
          "Se puede grabar con láser y pegar",
          "Se puede coser",
        ],
        applications: "Luminaria y cartelería (aplicaciones gráficas posibles)",
      },
      {
        name: "Goma espuma de borra de café",
        format: "Planchas de 28 × 28 cm",
        thickness: "8 mm",
        properties: [
          "100% biodegradable",
          "Color marrón; versión densa (símil corcho) y versión espuma",
          "No es impermeable",
          "Resiste calor hasta 85 °C",
          "Se puede grabar con láser y pegar",
        ],
        applications: "Packaging y revestimiento (análisis acústico en proceso)",
      },
      {
        name: "Rígido de borra de café",
        format: "Por consultar",
        properties: [
          "100% compostable",
          "Impermeable",
          "Resiste calor hasta 190 °C",
          "Color marrón",
          "Se puede grabar con láser",
        ],
        applications: "Objetos y packaging",
      },
    ],
    contact: {
      web: "http://www.etimobiomateriales.com",
    },
    color: "#7a4a2e",
    cover: photo("etimo", 8),
    images: photos("etimo", 23),
  },
  {
    id: "brote-plantable",
    number: "08",
    name: "Brote Plantable",
    family: "Papeles",
    familyGroup: "Papel y cartón",
    location: "Argentina",
    lead: "Pliegos de papel plantable.",
    produces: "Pliegos de papel plantable",
    composition: "Papel plantable",
    format: "A4",
    thickness: "Gramaje aproximado de 120 g/m² (informado en catálogo; verificar por variante)",
    cutting: verificar(),
    printing: si("inkjet, para el producto consultado"),
    engraving: verificar(),
    applications: ["Tarjetas", "Etiquetas", "Papelería"],
    extras: ["Láser, serigrafía, corte y grabado: por verificar"],
    notices: ["Las aplicaciones están a evaluar."],
    contact: { web: "https://broteplantable.com.ar/productos/pliego-a4/" },
    color: "#7d8a5a",
    images: [],
  },
  {
    id: "paper-srl",
    number: "09",
    name: "Paper SRL",
    family: "Papel y cartón",
    familyGroup: "Papel y cartón",
    location: "Córdoba",
    lead: "Packaging a partir de papeles y cartones reciclados.",
    produces: "Packaging a partir de papeles y cartones reciclados",
    composition: "Papeles y cartones reciclados",
    format: "Por producto y cotización",
    thickness: "Por producto",
    cutting: verificar("confirmar por línea"),
    printing: verificar("confirmar por línea"),
    engraving: verificar("confirmar por línea"),
    applications: ["Packaging de producción industrial"],
    extras: ["Troquelado y terminaciones: confirmar por línea"],
    notices: ["Verificar mínimos de producción."],
    contact: { web: "https://www.papersrl.com.ar/productos/packaging/" },
    color: "#9a7a52",
    images: [],
  },
  {
    id: "celulosa-moldeada",
    number: "10",
    name: "Celulosa Moldeada",
    family: "Papel y cartón",
    familyGroup: "Papel y cartón",
    location: "Santa Fe",
    lead: "Envases moldeados de pulpa celulósica recuperada.",
    produces: "Envases moldeados de pulpa celulósica recuperada",
    composition: "Pulpa celulósica recuperada",
    format: "Pieza tridimensional",
    thickness: "Gramaje por producto",
    cutting: verificar(),
    printing: verificar("impresión y estampado"),
    engraving: verificar(),
    applications: ["Embalaje protector", "Soportes moldeados"],
    extras: ["Moldeo: sí"],
    contact: { web: "https://celulosa.com.ar/empresa/celulosa-moldeada/" },
    color: "#a78d68",
    images: [],
  },
  {
    id: "the-pack-digest",
    number: "11",
    name: "The Pack Digest",
    family: "Packaging flexible",
    familyGroup: "Packaging flexible",
    location: "Buenos Aires",
    lead: "Sobres de materiales compostables y de polietileno reciclado o reciclable, según la línea.",
    produces: "Sobres de materiales compostables y polietileno reciclado/reciclable",
    composition: "Materiales compostables y polietileno reciclado/reciclable (según línea)",
    format: "Sobres de envío y bolsas",
    thickness: "Por solicitar (micras y porcentaje reciclado)",
    cutting: verificar("troquelado: confirmar"),
    printing: verificar("técnica de impresión: confirmar"),
    engraving: verificar(),
    applications: ["Sobres de envío", "Bolsas", "Packaging flexible"],
    extras: ["Personalización ofrecida", "Sellado: confirmar"],
    notices: ["Mínimos industriales desde 3.000 unidades."],
    contact: { web: "https://www.thepackdigest.com.ar/" },
    color: "#6f7f6a",
    images: [],
  },
  {
    id: "barensa",
    number: "12",
    name: "Barensa",
    family: "Textiles / no tejidos",
    familyGroup: "Textiles y no tejidos",
    location: "Argentina",
    lead: "Fieltros y no tejidos de poliéster, polipropileno o mezclas.",
    produces: "Fieltros y no tejidos de poliéster, polipropileno o mezclas",
    composition: "Poliéster, polipropileno o mezclas",
    format: "Definido por desarrollo",
    thickness: "Gramaje, espesor y densidad definidos por desarrollo",
    cutting: verificar("por confirmar para la formulación elegida"),
    printing: verificar("estampado: por confirmar"),
    engraving: verificar("por confirmar"),
    applications: ["Fundas", "Interiores de packaging", "Exhibidores"],
    notices: ["Contenido reciclado NO confirmado.", "Las aplicaciones son posibles, no confirmadas."],
    contact: { web: "https://www.barensa.com.ar/productos/procesos-industriales/" },
    color: "#8c7a6a",
    images: [],
  },
  {
    id: "laboratorio-unla",
    number: "13",
    name: "Laboratorio de Diseño UNLa",
    family: "Textiles / biotextiles",
    familyGroup: "Textiles y no tejidos",
    location: "Buenos Aires",
    lead: "Investigación de no tejidos a partir de descartes y de biotextiles.",
    produces: "Investigación de no tejidos de descartes y biotextiles",
    composition: "Descartes y subproductos textiles",
    format: "Sin ficha comercial; en investigación 2024–2026",
    thickness: "Por consultar al laboratorio",
    cutting: verificar("consultar al laboratorio"),
    printing: verificar("consultar al laboratorio"),
    engraving: verificar("consultar al laboratorio"),
    applications: ["Referencia de investigación"],
    notices: ["Referencia de investigación: no es un proveedor comercial confirmado."],
    contact: {
      web: "https://lad.unla.edu.ar/proyecto/nuevos-desarrollos-de-materiales-sustentables-en-produccion-textil-experimentacion-con-descartes-y-subproductos-para-la-elaboracion-de-no-tejidos/",
    },
    color: "#6a6e52",
    images: [],
  },
  {
    id: "agave",
    number: "14",
    name: "AGAVE (Tyvek)",
    family: "Material alternativo",
    familyGroup: "Material alternativo",
    location: "Olavarría, Buenos Aires",
    lead: "Objetos y packaging en Tyvek, un material reciclable (no necesariamente reciclado).",
    produces: "Objetos y packaging en Tyvek",
    composition: "Tyvek (reciclable, no necesariamente reciclado)",
    format: "Por variante",
    thickness: "Gramaje y espesor por variante",
    cutting: verificar(),
    printing: si("tintas al agua HP, declarada"),
    engraving: verificar(),
    applications: ["Accesorios", "Packaging corporativo"],
    notices: ["Distinguir material reciclable de contenido reciclado."],
    contact: { web: "https://agave.ar/" },
    color: "#b07a4c",
    images: [],
  },
];

export const getMaterial = (id: string) => materials.find((m) => m.id === id);

/** Texto de una capacidad para mostrar en fichas y comparador */
export const capabilityText = (c: Capability) =>
  c.status === "si" ? (c.note ? `Compatible · ${c.note}` : "Compatible") : c.note ? `Por verificar · ${c.note}` : "Por verificar";

/** Indica si un valor es un dato pendiente (se muestra con estilo de aviso) */
export const isPending = (value: string) => /^Por (relevar|verificar|solicitar|consultar)|por solicitar/i.test(value);
