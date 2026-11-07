import { Link, Route, Routes } from "react-router-dom";
import { CompareProvider } from "./components/CompareContext";
import { ScrollManager } from "./components/ScrollManager";
import { SimpleHeader } from "./components/Header";
import Home from "./pages/Home";
import MaterialDetail from "./pages/MaterialDetail";
import Compare from "./pages/Compare";

function NotFound() {
  return (
    <main className="min-h-screen bg-[#E0D9C7] text-[#403A2F]">
      <SimpleHeader actionLabel="Volver al inicio" actionTo="/" />
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <p className="eyebrow mb-5 text-[#904F2F]">Error 404</p>
        <h1 className="font-serif text-[clamp(3.5rem,8vw,8rem)] leading-[0.85] tracking-[-0.05em]">No encontramos esta página.</h1>
        <Link className="primary-action mt-10" to="/">
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <CompareProvider>
      <ScrollManager />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<MaterialDetail />} path="/materiales/:id" />
        <Route element={<Compare />} path="/comparar" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </CompareProvider>
  );
}
