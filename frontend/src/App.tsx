import { AppShell } from "@mantine/core";
import { Routes, Route, Outlet } from "react-router-dom";
import { NavbarMinimalColored } from "./components/NavBar";
import { CustomHeader } from "./components/Header";
import { Inicio } from "./Pages/Inicio";
import { StudentsPage } from "./Pages/Students";
import { ThemeProvider } from "context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio titulo="Inicio" />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="teachers" element={<Inicio titulo="Maestros" />} />
          <Route path="schedule" element={<Inicio titulo="Horarios" />} />
          <Route path="settings" element={<Inicio titulo="Ajustes" />} />

          {/* <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

function Layout() {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarMinimalColored />}
      header={<CustomHeader />}
    >
      <Outlet />
    </AppShell>
  );
}

export default App;
