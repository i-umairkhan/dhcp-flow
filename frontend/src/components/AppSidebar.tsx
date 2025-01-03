// external libraries imports
import { Bolt, GalleryVerticalEnd, Grip, SquareTerminal } from "lucide-react";
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
      name: "Configuration",
      url: "/configuration",
      icon: Bolt,
    },
  ],
  sidebarPlatformSectionData: [
    {
      title: "Subnets",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Show Subnets",
          url: "/show-subnets",
        },
        {
          title: "Add Subnet to Existing",
          url: "/add-subnet",
        },
      ],
    },
  ],
};

// appsidebar component
const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton size="lg">
          <div className="flex justify-center items-center bg-sidebar-primary rounded-lg text-sidebar-primary-foreground aspect-square size-8">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="flex-1 grid text-left text-sm leading-tight">
            <span className="font-semibold truncate">DHCP Flow</span>
            <span className="text-xs truncate">Open Source</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarStartHere data={data.startHereSectionData} />
        <SidebarPlatform data={data.sidebarPlatformSectionData} />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
