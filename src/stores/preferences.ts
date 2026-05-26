import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "auto";
export type Density = "comfortable" | "compact";
export type AccentColor =
  | "ocean"
  | "emerald"
  | "fuchsia"
  | "amber"
  | "indigo";

type PreferencesState = {
  theme: ThemeMode;
  density: Density;
  accent: AccentColor;
  sidebarCollapsed: boolean;
  setTheme: (t: ThemeMode) => void;
  setDensity: (d: Density) => void;
  setAccent: (a: AccentColor) => void;
  setSidebarCollapsed: (v: boolean) => void;
};

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "auto" && prefersDark);
  root.classList.toggle("dark", dark);
}

function applyDensity(density: Density) {
  document.documentElement.setAttribute("data-density", density);
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: "light",
      density: "compact",
      accent: "ocean",
      sidebarCollapsed: false,
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      setDensity: (density) => {
        applyDensity(density);
        set({ density });
      },
      setAccent: (accent) => set({ accent }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
    }),
    {
      name: "lucario-preferences",
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
          applyDensity(state.density);
        }
      },
    },
  ),
);
