import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import { usePreferencesStore } from "../stores/preferences";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

function ThemeSync({ children }: { children: ReactNode }) {
  const theme = usePreferencesStore((s) => s.theme);
  const density = usePreferencesStore((s) => s.density);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = theme === "dark" || (theme === "auto" && prefersDark);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("data-density", density);
  }, [theme, density]);

  return <>{children}</>;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeSync>
        {children}
        <Toaster position="top-center" richColors closeButton />
      </ThemeSync>
    </QueryClientProvider>
  );
}

export { queryClient };
