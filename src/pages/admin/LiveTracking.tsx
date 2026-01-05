import { useState, useEffect } from "react";
import { MapPin, Bus, Filter, RefreshCw, Search, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useData } from "@/context/DataContext";
import { toast } from "sonner";
import LiveMap from "@/components/common/Map";
import { Autocomplete } from "@/components/ui/autocomplete";
import { useSearchParams } from "react-router-dom";

const statusColors = {
  "on-route": "bg-success",
  "delayed": "bg-warning",
  "idle": "bg-muted-foreground",
  "maintenance": "bg-destructive",
  "completed": "bg-primary"
};

export default function LiveTracking() {
  const { buses, routes, refreshData, searchQuery: globalSearchQuery } = useData();
  const [searchParams] = useSearchParams();
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const searchQuery = globalSearchQuery || localSearchQuery;

  // Auto-select bus from URL query parameter
  useEffect(() => {
    const busId = searchParams.get("bus");
    if (busId && buses.some(b => b.id === busId)) {
      setSelectedBus(busId);
      toast.success(`Showing live details for ${buses.find(b => b.id === busId)?.busNumber}`);
    }
  }, [searchParams, buses]);

  const filteredBuses = buses.filter((b) => {
    const matchesFilter = filter === "all" || b.status === filter;

    // Find the route details for this bus to search stops
    const busRoute = routes.find(r => r.name === b.route);
    const matchesStops = busRoute?.stops?.some(stop => stop.toLowerCase().includes(searchQuery.toLowerCase()));

    const s = searchQuery.toLowerCase();
    const matchesSearch = (b.busNumber?.toLowerCase().includes(s) || false) ||
      (b.route?.toLowerCase().includes(s) || false) ||
      (b.driver?.toLowerCase().includes(s) || false) ||
      (b.district?.toLowerCase().includes(s) || false) ||
      (b.mandal?.toLowerCase().includes(s) || false) ||
      (b.state?.toLowerCase().includes(s) || false) ||
      (matchesStops || false);

    return matchesFilter && matchesSearch;
  });



  const handleRefresh = () => {
    setFilter("all");
    setLocalSearchQuery("");
    setSelectedBus(null);
    refreshData();
    toast.success("Filters reset and data updated");
  };





  const uniqueSearchOptions = Array.from(new Set([
    ...buses.map(b => b.busNumber),
    ...buses.map(b => b.driver),
    ...buses.map(b => b.mandal).filter(Boolean),
    ...buses.map(b => b.district).filter(Boolean),
    ...routes.map(r => r.name),
    ...routes.flatMap(r => r.stops)
  ]));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Live Tracking</h1>
          <p className="text-muted-foreground">Real-time GPS tracking of all buses</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={handleRefresh}>
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Component - Rapido Style */}
        <Card className="lg:col-span-3 animate-fade-in h-[700px] flex flex-col overflow-hidden border-0 shadow-2xl">
          <CardContent className="p-0 flex-1 relative z-0">
            <LiveMap
              buses={filteredBuses}
              onBusClick={setSelectedBus}
              noData={filteredBuses.length === 0 && searchQuery !== ""}
              showDriverCard={true}
            />
          </CardContent>
        </Card>

        {/* Bus List & Filters */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
              <Autocomplete
                options={uniqueSearchOptions}
                placeholder="Search buses or places..."
                className="pl-10"
                value={localSearchQuery}
                onChange={setLocalSearchQuery}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="on-route">On Route</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                    <SelectItem value="idle">Idle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredBuses.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">No buses found.</div>
            ) : filteredBuses.map((bus) => {
              const busRoute = routes.find(r => r.name === bus.route);
              return (
                <Card
                  key={bus.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md animate-fade-in",
                    selectedBus === bus.id && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedBus(bus.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{bus.busNumber}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          {bus.state}, {bus.district}, {bus.mandal}
                        </p>
                      </div>
                      <Badge className={cn("text-xs text-white", statusColors[bus.status as keyof typeof statusColors] || "bg-gray-500")}>
                        {bus.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium">{bus.route}</p>
                      <div className="flex justify-between mt-1">
                        <span>{bus.passengers}/{bus.capacity} pax</span>
                        <span className="font-mono">{bus.speed || 0} km/h</span>
                      </div>
                      {bus.isHarshDriving && (
                        <div className="mt-1 text-xs text-red-600 font-bold bg-red-100 p-1 rounded">
                          Harsh Driving Detected
                        </div>
                      )}
                      {bus.isSOS && (
                        <div className="mt-1 text-xs text-white font-bold bg-red-600 p-1 rounded animate-pulse">
                          SOS ACTIVE
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
