import { Bell, Search, User, X } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useData } from "@/context/DataContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function AdminHeader() {
  const { setSearchQuery, alerts } = useData(); // alerts from context
  const navigate = useNavigate();

  const activeAlerts = alerts.filter(a => a.status === 'active');

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 gap-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students, buses..."
            className="pl-10 w-64 bg-muted/50 border-0 focus-visible:ring-1"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {activeAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {activeAlerts.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-3 border-b flex items-center justify-between">
              <span className="font-semibold">Notifications</span>
              <span className="text-xs text-muted-foreground">{activeAlerts.length} unread</span>
            </div>
            <ScrollArea className="h-[300px]">
              {activeAlerts.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">No new notifications</div>
              ) : (
                <div className="grid">
                  {activeAlerts.map(alert => (
                    <div key={alert.id} className="p-3 border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => navigate('/admin/alerts')}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{alert.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">{alert.message}</p>
                        </div>
                        <Badge variant={alert.severity === 'error' ? 'destructive' : 'secondary'} className="text-[10px] h-5 px-1.5 capitalize">
                          {alert.type}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-muted-foreground mt-2 block">{alert.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            <div className="p-2 border-t text-center">
              <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => navigate('/admin/alerts')}>View all notifications</Button>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="hidden md:inline text-sm font-medium">Admin User</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/admin/settings")}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/admin/settings")}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={() => navigate("/login")}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
