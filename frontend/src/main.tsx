import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Auth from "./pages/Auth/Auth";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>,
);
