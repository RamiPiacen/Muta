# MUTA · Materialoteca sustentable

Sitio web para explorar y comparar materiales sustentables producidos en Argentina.
Hecho con React 19, Vite, TypeScript, Tailwind CSS 4 y React Router.

## Cómo correrlo

```bash
npm install
npm run dev      # servidor local
npm run build    # compila para producción (revisa tipos y genera /dist)
npm run preview  # prueba la versión compilada
```

## Estructura

```
src/
  data/materials.ts      # los 13 materiales (única fuente de datos)
  pages/                 # Home, MaterialDetail, Compare
  components/            # Header, Footer, comparador (CompareContext), etc.
  index.css              # estilos del diseño de Figma
public/materiales/       # fotos en WebP, una carpeta por material
```

## Cómo agregar o editar un material

Todo sale de `src/data/materials.ts`. Para agregar un material, sumá un objeto al arreglo `materials`
y poné sus fotos en `public/materiales/<id>/` con el nombre `<id>-01.webp`, `<id>-02.webp`, etc.
Después indicá la cantidad de fotos con `photos("<id>", cantidad)`.

Regla del inventario: **"sin dato" nunca equivale a "no compatible"**. Un dato sin confirmar se marca con
`verificar()` y la web lo muestra como "Por verificar".

## Rutas

| Ruta | Pantalla |
|---|---|
| `/` | Home con buscador y filtros |
| `/materiales/:id` | Ficha del material (ideal para el QR de la materialoteca física) |
| `/comparar` | Comparador de hasta 3 materiales |

## Deploy en Vercel

Vercel detecta Vite automáticamente. `vercel.json` redirige todas las rutas a `index.html`
para que funcionen los links directos a cada ficha.

## Pendientes

- Fotos de los materiales 08 al 14.
- Versión tablet del diseño.
- Confirmar el mail de contacto del pie de página (hoy `hola@muta.ar` es provisorio).
- Revisar los datos marcados como "por verificar" con cada fabricante.
