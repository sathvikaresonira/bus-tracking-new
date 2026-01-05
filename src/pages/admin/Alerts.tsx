import { useState } from "react";
import { Bell, AlertTriangle, CheckCircle, Clock, Filter, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useData } from "@/context/DataContext";
import { toast } from "sonner";

const severityStyles = {
  error: { bg: "bg-destructive/10", text: "text-destructive", icon: AlertTriangle },
  warning: { bg: "bg-warning/10", text: "text-warning", icon: Clock },
  info: { bg: "bg-primary/10", text: "text-primary", icon: Bell },
};

export default function Alerts() {
  /* State for filters */
  const { alerts, stats, refreshData } = useData();
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("alerts");

  /* Mock notifications for now as they are not in Context yet */
  const notifications = [
    { id: "1", type: "boarding", message: "John Smith boarded Bus 101", recipient: "Mary Smith", channel: "SMS", status: "delivered", time: "7:15 AM" },
    { id: "2", type: "boarding", message: "Emma Wilson boarded Bus 102", recipient: "David Wilson", channel: "Push", status: "delivered", time: "7:22 AM" },
    { id: "3", type: "arrival", message: "Bus 101 arriving at school in 5 mins", recipient: "Multiple (45)", channel: "Push", status: "delivered", time: "7:40 AM" },
    { id: "4", type: "boarding", message: "John Smith left school", recipient: "Mary Smith", channel: "SMS", status: "failed", time: "3:35 PM" },
    { id: "5", type: "delay", message: "Bus 102 delayed by 10 mins", recipient: "Route B Parents", channel: "SMS", status: "delivered", time: "3:45 PM" },
  ];

  /* Filter logic */
  const filteredAlerts = alerts.filter((a) => {
    const typeMatch = typeFilter === "all" || a.type === typeFilter;
    if (statusFilter === 'all') return typeMatch;
    return typeMatch && a.status === statusFilter;
  });

  const activeAlertsCount = alerts.filter(a => a.status === 'active').length;
  const resolvedTodayCount = alerts.filter(a => a.status === 'resolved').length;
  const deliveryRate = "98.2%";

  const handleRefresh = () => {
    refreshData();
    toast.success("Alerts refreshed");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Alerts & Notifications</h1>
          <p className="text-muted-foreground">Monitor system alerts and notification delivery</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={handleRefresh}>
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="animate-fade-in cursor-pointer hover:shadow-md transition-all" onClick={() => { setStatusFilter('active'); setTypeFilter('all'); setActiveTab("alerts"); }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold">{activeAlertsCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in cursor-pointer hover:shadow-md transition-all" onClick={() => setActiveTab("notifications")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Notifications Sent</p>
                <p className="text-2xl font-bold">{stats.notificationsSent.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in cursor-pointer hover:shadow-md transition-all" onClick={() => setActiveTab("notifications")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Delivery Rate</p>
                <p className="text-2xl font-bold">{deliveryRate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          <TabsTrigger value="notifications">Notification Log</TabsTrigger>
        </TabsList>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="delay">Delays</SelectItem>
                <SelectItem value="geofence">Geofence</SelectItem>
                <SelectItem value="notification">Notifications</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">No alerts found.</div>
            ) : filteredAlerts.map((alert) => {
              const severity = severityStyles[alert.severity as keyof typeof severityStyles] || severityStyles.info;
              const Icon = severity.icon;
              return (
                <Card key={alert.id} className={cn("animate-fade-in", alert.status === "resolved" && "opacity-60")}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", severity.bg)}>
                        <Icon className={cn("w-5 h-5", severity.text)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <Badge className={cn(
                            alert.status === "active" ? "bg-destructive text-destructive-foreground" :
                              alert.status === "resolved" ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                          )}>
                            {alert.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{notif.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">To: {notif.recipient}</span>
                        <Badge variant="outline" className="text-xs">{notif.channel}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={cn(
                        notif.status === "delivered" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                      )}>
                        {notif.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div >
  );
}
