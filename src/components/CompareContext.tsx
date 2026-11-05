import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { materials, type Material } from "../data/materials";

export const MAX_COMPARE = 3;
const STORAGE_KEY = "muta:compare";

type CompareState = {
  ids: string[];
  selected: Material[];
  isFull: boolean;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
};

const CompareContext = createContext<CompareState | null>(null);

function readStored(): string[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string" && materials.some((m) => m.id === id)).slice(0, MAX_COMPARE);
  } catch {
    return [];
  }
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(readStored);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* el almacenamiento puede no estar disponible: la comparación sigue funcionando en memoria */
    }
  }, [ids]);

  const toggle = useCallback((id: string) => {
    setIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= MAX_COMPARE) return current;
      return [...current, id];
    });
  }, []);

  const remove = useCallback((id: string) => setIds((current) => current.filter((item) => item !== id)), []);

  const value = useMemo<CompareState>(
    () => ({
      ids,
      // Se respeta el orden en que el usuario fue agregando los materiales
      selected: ids.map((id) => materials.find((m) => m.id === id)).filter((m): m is Material => Boolean(m)),
      isFull: ids.length >= MAX_COMPARE,
      has: (id) => ids.includes(id),
      toggle,
      remove,
    }),
    [ids, toggle, remove],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare debe usarse dentro de <CompareProvider>");
  return context;
}
