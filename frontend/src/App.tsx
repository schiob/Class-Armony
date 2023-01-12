import { AppShell } from "@mantine/core";
import { Routes, Route, Outlet } from "react-router-dom";
import { NavbarMinimalColored } from "./components/NavBar";
import { CustomHeader } from "./components/Header";
import { Inicio } from "./Pages/Inicio";
import { TableScrollArea } from "./Pages/Students";
import { ThemeProvider } from "./ThemeProvider";

function App() {
  const students = [
    { name: "Chio", email: "chio@algo", company: "chio code" },
    { name: "Peña", email: "presi@algo", company: "gob" },
  ];

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio titulo="Inicio" />} />
          <Route path="students" element={<TableScrollArea data={students} />} />
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
