// external libraries imports
import { type LucideIcon } from "lucide-react";
// components imports
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { useLocation } from "react-router";

// sidebarstarthere component
export function SidebarStartHere({
  data,
}: {
  data: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  let location = useLocation();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Start Here</SidebarGroupLabel>
      <SidebarMenu>
        {data.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              className={
                item.url === location.pathname ? "bg-gray-100 rounded-sm" : ""
              }
            >
              <Link to={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
