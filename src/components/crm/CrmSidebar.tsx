import { LayoutDashboard, Users, BarChart3, UserPlus, LogOut, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export type CrmView = "dashboard" | "leads" | "charts";

interface CrmSidebarProps {
  activeView: CrmView;
  onViewChange: (view: CrmView) => void;
  onAddLead?: () => void;
}

const navItems = [
  { key: "dashboard" as CrmView, label: "Dashboard", icon: LayoutDashboard },
  { key: "leads" as CrmView, label: "Leads", icon: Users },
  { key: "charts" as CrmView, label: "Charts", icon: BarChart3 },
];

export function CrmSidebar({ activeView, onViewChange, onAddLead }: CrmSidebarProps) {
  const { signOut, user } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary shrink-0" />
          {!collapsed && (
            <span className="text-lg font-heading font-bold text-foreground">LeadFlow</span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    isActive={activeView === item.key}
                    tooltip={item.label}
                    onClick={() => onViewChange(item.key)}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.label}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Add Lead" onClick={onAddLead}>
                  <UserPlus className="h-4 w-4" />
                  {!collapsed && <span>Add Lead</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-3">
        {!collapsed && (
          <p className="text-xs text-muted-foreground truncate mb-2">
            {user?.email}
          </p>
        )}
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          onClick={handleLogout}
          className="w-full text-muted-foreground hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
