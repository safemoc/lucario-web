import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AppProviders } from "./app/providers";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { PageSkeleton } from "./components/Skeleton";
import Login from "./pages/Login";

const Home = lazy(() => import("./pages/dashboard/Home"));
const Assets = lazy(() => import("./pages/dashboard/Assets"));
const Departments = lazy(() => import("./pages/dashboard/Departments"));
const Projects = lazy(() => import("./pages/dashboard/Projects"));
const Knowledge = lazy(() => import("./pages/dashboard/Knowledge"));
const Social = lazy(() => import("./pages/dashboard/Social"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));

function ProtectedRoute({
  authed,
  onLogout,
}: {
  authed: boolean;
  onLogout: () => void;
}) {
  if (!authed) return <Navigate to="/login" replace />;
  return (
    <Routes>
      <Route element={<DashboardLayout onLogout={onLogout} />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="assets"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Assets />
            </Suspense>
          }
        />
        <Route
          path="departments"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Departments />
            </Suspense>
          }
        />
        <Route
          path="projects"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Projects />
            </Suspense>
          }
        />
        <Route
          path="knowledge"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Knowledge />
            </Suspense>
          }
        />
        <Route
          path="social"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Social />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <Settings />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function AuthListener() {
  const navigate = useNavigate();
  useEffect(() => {
    const handler = () => navigate("/login");
    window.addEventListener("lucario:unauthorized", handler);
    return () => window.removeEventListener("lucario:unauthorized", handler);
  }, [navigate]);
  return null;
}

function App() {
  const [authed, setAuthed] = useState(
    () => localStorage.getItem("lucario_authed") === "1",
  );

  const onLogin = () => {
    localStorage.setItem("lucario_authed", "1");
    localStorage.setItem("lucario_token", "mock-token");
    setAuthed(true);
  };

  const onLogout = () => {
    localStorage.removeItem("lucario_authed");
    localStorage.removeItem("lucario_token");
    setAuthed(false);
  };

  return (
    <AppProviders>
      <BrowserRouter>
        <AuthListener />
        <Routes>
          <Route
            path="/login"
            element={
              authed ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login onSuccess={onLogin} />
              )
            }
          />
          <Route
            path="/*"
            element={<ProtectedRoute authed={authed} onLogout={onLogout} />}
          />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
