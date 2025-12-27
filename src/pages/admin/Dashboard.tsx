import { Users, Bus, ScanLine, Bell, TrendingUp, Clock, RefreshCw } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { BusStatusCard } from "@/components/admin/BusStatusCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/context/DataContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Dashboard() {
  const { stats, buses, searchQuery, refreshData } = useData();
  const navigate = useNavigate();

  // Filter buses based on global search query
  const filteredBuses = buses.filter(bus =>
    bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* Add refresh handler */
  const handleRefresh = () => {
    refreshData();
    toast.success("Dashboard data refreshed");
  };

  const hasSOS = buses.some(b => b.isSOS);

  return (
    <div className="space-y-6 relative">
      {hasSOS && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50 overflow-hidden">
          <div className="text-[15rem] font-black text-destructive/10 -rotate-12 select-none animate-pulse whitespace-nowrap">
            SOS ACTIVE
          </div>
          <div className="fixed bottom-4 right-4 bg-destructive text-white px-6 py-4 rounded-xl shadow-2xl animate-bounce z-50 flex items-center gap-3">
            <Bell className="w-8 h-8" />
            <div className="text-left">
              <p className="font-bold text-lg">EMERGENCY DETECTED</p>
              <p className="text-sm">Check alerts immediately</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div onClick={() => navigate("/admin/students")} className="cursor-pointer transition-transform hover:scale-[1.02]">
          <StatCard
            title="Total Students"
            value={stats.totalStudents.toLocaleString()}
            change="+12 this week"
            changeType="positive"
            icon={Users}
            iconColor="text-primary"
            iconBgColor="bg-primary/10"
          />
        </div>
        <div onClick={() => navigate("/admin/buses")} className="cursor-pointer transition-transform hover:scale-[1.02]">
          <StatCard
            title="Active Buses"
            value={stats.activeBuses.toString()}
            change={`${buses.length - stats.activeBuses} idle`}
            changeType="neutral"
            icon={Bus}
            iconColor="text-secondary"
            iconBgColor="bg-secondary/10"
          />
        </div>
        <div onClick={() => navigate("/admin/attendance")} className="cursor-pointer transition-transform hover:scale-[1.02]">
          <StatCard
            title="Today's Scans"
            value={stats.todaysScans.toLocaleString()}
            change="+5% from yesterday"
            changeType="positive"
            icon={ScanLine}
            iconColor="text-success"
            iconBgColor="bg-success/10"
          />
        </div>
        <div onClick={() => navigate("/admin/alerts")} className="cursor-pointer transition-transform hover:scale-[1.02]">
          <StatCard
            title="Notifications Sent"
            value={stats.notificationsSent.toLocaleString()}
            change="98% delivered"
            changeType="positive"
            icon={Bell}
            iconColor="text-warning"
            iconBgColor="bg-warning/10"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bus Status */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Bus Fleet Status</h2>
            <button
              className="text-sm text-primary hover:underline"
              onClick={() => navigate("/admin/buses")}
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBuses.length > 0 ? (
              filteredBuses.slice(0, 4).map((bus) => (
                <BusStatusCard key={bus.id} {...bus} />
              ))
            ) : (
              <div className="col-span-2 text-center py-10 text-muted-foreground bg-muted/30 rounded-lg">
                No buses found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Today's Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">On-time arrivals</span>
                <span className="font-semibold text-success">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Boarding efficiency</span>
                <span className="font-semibold">89%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Parent notification rate</span>
                <span className="font-semibold text-success">98%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Upcoming Schedules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Afternoon Pickup</p>
                  <p className="text-sm text-muted-foreground">All routes</p>
                </div>
                <span className="text-sm font-medium text-primary">2:30 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Route B Return</p>
                  <p className="text-sm text-muted-foreground">Bus 102, 105</p>
                </div>
                <span className="text-sm font-medium text-muted-foreground">3:45 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Evening Maintenance</p>
                  <p className="text-sm text-muted-foreground">Bus 101, 103</p>
                </div>
                <span className="text-sm font-medium text-muted-foreground">5:00 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
