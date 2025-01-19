// external libraries imports
import { Bolt, Code, GalleryVerticalEnd, Grip, Network } from "lucide-react";
// components imports
import { SidebarPlatform } from "@/components/SidebarPlatform";
import { SidebarStartHere } from "@/components/SidebarStartHere";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

// data for the sidebar
const data = {
  startHereSectionData: [
    {
      name: "Dashboard",
      url: "/",
      icon: Grip,
    },
    {
      name: "Settings",
      url: "/settings",
      icon: Bolt,
    },
  ],
  sidebarPlatformSectionData: [
    {
      title: "Configuration Managment",
      url: "#",
      icon: Code,
      isActive: true,
      items: [
        {
          title: "Show Configuration",
          url: "/show-configuration",
        },
        {
          title: "Custom Configuration",
          url: "/custom-configuration",
        },
      ],
    },
    {
      title: "Subnet Managment",
      url: "#",
      icon: Network,
      isActive: true,
      items: [
        {
          title: "Manage Subnets",
          url: "/manage-subnets",
        },
        {
          title: "Add new Subnets",
          url: "/add-new-subnet",
        },
      ],
    },
  ],
};

// appsidebar component
const AppSidebar = () => {
  return (
    <Sidebar className="">
      <SidebarHeader className="bg-gray-200">
        <SidebarMenuButton size="lg" className="bg-gray-300">
          <div className="flex justify-center items-center bg-sidebar-primary rounded-lg text-sidebar-primary-foreground aspect-square size-8">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="flex-1 grid text-black text-left text-sm leading-tight">
            <span className="font-semibold truncate">DHCP Flow</span>
            <span className="text-xs truncate">Pro Edition</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="bg-gray-200">
        <SidebarStartHere data={data.startHereSectionData} />
        <SidebarPlatform data={data.sidebarPlatformSectionData} />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
