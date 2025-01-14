// react imports
import { createRoot } from "react-dom/client";
// css imports
import "./index.css";
// components imports
import Dashboard from "@/pages/Dashboard/Dashboard";
// external libraries imports
import { BrowserRouter, Route, Routes } from "react-router";
// components imports
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Configuration from "@/pages/Configuration/Configuration";
import ShowSubnets from "@/pages/ShowSubnets/ShowSubnets";
import AddSubnetToExsisting from "@/pages/AddSubnetToExsisting/AddSubnetToExsisting";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SidebarProvider>
      {/* Routes */}
      <AppSidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Configuration />} />
        <Route path="/manage-subnets" element={<ShowSubnets />} />
        <Route path="/add-new-subnet" element={<AddSubnetToExsisting />} />
      </Routes>
    </SidebarProvider>
  </BrowserRouter>,
);
