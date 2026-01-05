import { useState } from "react";
import { Bus, Route as RouteIcon, Plus, Edit, Trash2, MoreVertical, MapPin, Search, ChevronRight, Clock, Navigation, Share2, MessageSquare, RefreshCw, User, Phone, Shield, Users, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useData } from "@/context/DataContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Component to display the "Where is my Train" style timeline
const RouteTimeline = ({ route, buses }: { route: any, buses: any[] }) => {
  // Mock current status logic
  const activeBus = buses.find(b => b.status === 'on-route') || buses[0];
  const currentStopIndex = activeBus ? Math.floor(route.stops.length / 2) : 0; // Mocking current position

  // Generate mock schedule data
  const scheduleData = route.stops.map((stop: string, index: number) => {
    const baseTime = new Date();
    baseTime.setHours(7, 0, 0, 0); // Start at 7:00 AM
    const arrivalTime = new Date(baseTime.getTime() + index * 15 * 60000);
    const departureTime = new Date(arrivalTime.getTime() + 2 * 60000); // 2 min stop

    return {
      name: stop,
      distance: `${index * 5} km`,
      platform: `Stop ${index + 1}`,
      arrivalTime: arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      departureTime: departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isPassed: index < currentStopIndex,
      isCurrent: index === currentStopIndex,
      isNext: index === currentStopIndex + 1,
    };
  });

  return (
    <div className="bg-slate-950 text-slate-100 h-full flex flex-col overflow-hidden relative font-sans">
      {/* Header Info Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">Today</Badge>
          <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700 flex items-center gap-1"><Clock className="w-3 h-3" /> On Time</Badge>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-white"><Share2 className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {/* Column Headers */}
        <div className="flex text-xs text-slate-500 font-medium mb-4 px-2">
          <div className="w-20 text-right">Arrival</div>
          <div className="w-16"></div> {/* Spacer for timeline line */}
          <div className="flex-1">Station</div>
          <div className="w-20 text-right">Departure</div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[94px] top-4 bottom-4 w-1 bg-slate-700/50 rounded-full z-0"></div>

          {/* Completed Line Overlay */}
          <div
            className="absolute left-[94px] top-4 w-1 bg-blue-500 rounded-full z-0 transition-all duration-1000 ease-in-out"
            style={{ height: `${(currentStopIndex / (scheduleData.length - 1)) * 100}%` }}
          ></div>

          {scheduleData.map((stop: any, index: number) => (
            <div key={index} className={cn("flex items-start min-h-[80px] group relative z-10", stop.isCurrent && "mt-4 mb-4")}>
              {/* Left: Arrival Time */}
              <div className="w-20 text-right pt-1">
                <div className={cn("text-sm font-medium", stop.isPassed ? "text-slate-500" : "text-slate-200")}>
                  {stop.arrivalTime}
                </div>
                <div className="text-xs text-red-400 mt-0.5 hidden group-hover:block">DELAY 5m</div>
              </div>

              {/* Center: Timeline Marker */}
              <div className="w-16 flex flex-col items-center justify-start relative pt-1.5">
                {stop.isCurrent ? (
                  <div className="relative z-20">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse">
                      <Bus className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 h-full w-0.5 bg-dashed border-l-2 border-blue-500/50 h-8"></div>
                  </div>
                ) : (
                  <div className={cn(
                    "w-3 h-3 rounded-full border-2 z-20 transition-colors bg-slate-900",
                    stop.isPassed ? "border-blue-500 bg-blue-500" : "border-slate-600"
                  )}></div>
                )}
              </div>

              {/* Right: Station Info */}
              <div className="flex-1 pt-1 pb-8 border-b border-slate-800/50 group-last:border-0 pl-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className={cn("font-medium text-base", stop.isCurrent ? "text-blue-400 text-lg" : "text-slate-200")}>
                      {stop.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">{stop.distance}</span>
                      <span className="text-xs text-slate-500 border border-slate-700 rounded px-1">{stop.platform}</span>
                      <Button variant="ghost" size="icon" className="h-4 w-4 text-slate-600 hover:text-blue-400 ml-1"><Edit className="w-3 h-3" /></Button>
                    </div>
                  </div>

                  {/* Right: Departure Time */}
                  <div className="w-20 text-right">
                    <div className={cn("text-sm font-medium", stop.isPassed ? "text-slate-500" : "text-red-400")}>
                      {stop.departureTime}
                    </div>
                  </div>
                </div>

                {stop.isCurrent && (
                  <div className="mt-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                    <div className="text-xs text-blue-400 font-medium mb-1">CURRENTLY HERE</div>
                    <div className="text-sm text-slate-300">Picking up students. Departing in 2 mins.</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Status Button - Collapsible */}
      {activeBus && (
        <div className="bg-slate-900 border-t border-slate-800 p-3 z-20">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer list-none p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Next Stop</div>
                  <div className="text-sm font-bold text-white">{scheduleData[currentStopIndex + 1]?.name || "End of Route"}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white text-xs">On Time</Badge>
                <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform" />
              </div>
            </summary>
            <div className="mt-3 p-4 bg-slate-800 rounded-lg border border-slate-700 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Next Stop</div>
                  <div className="text-lg font-bold text-white">{scheduleData[currentStopIndex + 1]?.name || "End of Route"}</div>
                  <div className="text-sm text-slate-400 mt-0.5">13km - {scheduleData[currentStopIndex + 1]?.arrivalTime || "N/A"}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Final Destination</div>
                  <div className="text-lg font-bold text-white">{route.stops[route.stops.length - 1]}</div>
                  <div className="text-sm text-slate-400 mt-0.5">{route.distance} - {scheduleData[scheduleData.length - 1]?.arrivalTime}</div>
                </div>
              </div>
              <div className="bg-amber-900/40 text-amber-200 px-3 py-2 rounded-lg text-sm flex items-start gap-2 border border-amber-900/50">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
                <span>Currently at {scheduleData[currentStopIndex]?.name}. Picking up students.</span>
              </div>
            </div>
          </details>
        </div>
      )}
    </div>
  );
};

export default function Buses() {
  const { buses, routes, drivers, addBus, deleteBus, updateBus, restoreBus, addRoute, deleteRoute, updateRoute, restoreRoute, searchQuery: globalSearchQuery } = useData();
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const searchQuery = globalSearchQuery || localSearchQuery;
  const [editingBusId, setEditingBusId] = useState<string | null>(null);
  const [editingRouteId, setEditingRouteId] = useState<string | null>(null);
  const [viewingRoute, setViewingRoute] = useState<any | null>(null);
  const [viewingBus, setViewingBus] = useState<any | null>(null);

  const [newBus, setNewBus] = useState({
    busNumber: "",
    plate: "",
    capacity: 40,
    driver: "",
    status: "idle" as "idle" | "on-route" | "delayed" | "maintenance" | "completed",
    route: ""
  });

  const [newRoute, setNewRoute] = useState({
    name: "",
    stops: [],
    distance: "10km",
    estimatedTime: "30 mins",
    morningTime: "07:00",
    eveningTime: "15:00"
  });



  /* Bus Handlers */
  const openAddBusDialog = () => {
    setEditingBusId(null);
    setNewBus({ busNumber: "", plate: "", capacity: 40, driver: "", status: "idle", route: "" });
    setIsAddBusOpen(true);
  };

  const openEditBusDialog = (bus: any) => {
    setEditingBusId(bus.id);
    setNewBus({
      busNumber: bus.busNumber,
      plate: bus.plate || "",
      capacity: bus.capacity,
      driver: bus.driver,
      status: bus.status,
      route: bus.route
    });
    setIsAddBusOpen(true);
  };

  const handleAddBus = () => {
    if (!newBus.busNumber) return toast.error("Bus Number required");
    if (editingBusId) {
      // @ts-ignore
      updateBus(editingBusId, newBus);
      toast.success("Bus updated");
    } else {
      // @ts-ignore
      addBus({ ...newBus, passengers: 0 });
      toast.success("Bus added");
    }
    setIsAddBusOpen(false);
    setEditingBusId(null);
  };

  const handleDeleteBus = (id: string) => {
    const busToDelete = buses.find(b => b.id === id);
    deleteBus(id);
    toast.success("Bus deleted", {
      action: {
        label: "Undo",
        onClick: () => busToDelete && restoreBus(busToDelete),
      },
    });
  };

  /* Route Handlers */
  const openEditRouteDialog = (e: React.MouseEvent, route: any) => {
    e.stopPropagation(); // Prevent opening map when clicking edit
    setEditingRouteId(route.id);
    setNewRoute({
      name: route.name,
      stops: route.stops,
      distance: route.distance,
      estimatedTime: route.estimatedTime,
      morningTime: "07:00", // Default or parsed if available
      eveningTime: "15:00"  // Default or parsed if available
    });
    setIsAddRouteOpen(true);
  };

  const handleAddRoute = () => {
    if (!newRoute.name) return toast.error("Route Name required");

    if (editingRouteId) {
      // @ts-ignore
      updateRoute(editingRouteId, newRoute);
      toast.success("Route updated");
    } else {
      addRoute(newRoute);
      toast.success("Route added");
    }
    setIsAddRouteOpen(false);
    setEditingRouteId(null);
    setNewRoute({ name: "", stops: [], distance: "10km", estimatedTime: "30 mins", morningTime: "07:00", eveningTime: "15:00" });
  };

  const handleDeleteRoute = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const routeToDelete = routes.find(r => r.id === id);
    deleteRoute(id);
    toast.success("Route deleted", {
      action: {
        label: "Undo",
        onClick: () => routeToDelete && restoreRoute(routeToDelete),
      },
    });
  };



  const filteredBuses = buses.filter(b =>
    b.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Buses & Routes</h1>
          <p className="text-muted-foreground">Manage fleet, routes, and driver assignments</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search buses, drivers, routes..."
          className="pl-10 max-w-sm"
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="buses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="buses" className="gap-2">
            <Bus className="w-4 h-4" /> Buses
          </TabsTrigger>
          <TabsTrigger value="routes" className="gap-2">
            <MapPin className="w-4 h-4" /> Routes
          </TabsTrigger>

        </TabsList>

        {/* Buses Tab */}
        <TabsContent value="buses" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isAddBusOpen} onOpenChange={setIsAddBusOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" onClick={openAddBusDialog}>
                  <Plus className="w-4 h-4" /> Add Bus
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingBusId ? "Edit Bus" : "Add New Bus"}</DialogTitle>
                  <DialogDescription>{editingBusId ? "Update bus details." : "Register a new bus to the fleet."}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Bus Number</Label>
                      <Input
                        placeholder="Bus 106"
                        value={newBus.busNumber}
                        onChange={e => setNewBus({ ...newBus, busNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Registration Number</Label>
                      <Input
                        placeholder="TS 09 UA 1234"
                        value={newBus.plate}
                        onChange={e => setNewBus({ ...newBus, plate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Capacity</Label>
                      <Input type="number" placeholder="40"
                        value={newBus.capacity}
                        onChange={e => setNewBus({ ...newBus, capacity: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select value={newBus.status} onValueChange={(val: any) => setNewBus({ ...newBus, status: val })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="idle">Idle</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Assign Driver</Label>
                    <Select onValueChange={(val) => setNewBus({ ...newBus, driver: val })} value={newBus.driver}>
                      <SelectTrigger><SelectValue placeholder="Select driver" /></SelectTrigger>
                      <SelectContent>
                        {drivers.length > 0 ? drivers.map((d) => (
                          <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                        )) : <SelectItem value="john">John Doe (Mock)</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddBusOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddBus}>Add Bus</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="animate-fade-in">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBuses.map((bus) => (
                    <TableRow key={bus.id}>
                      <TableCell className="font-medium">
                        <button
                          onClick={() => setViewingBus(bus)}
                          className="hover:underline text-left font-semibold text-primary"
                        >
                          <div>{bus.busNumber}</div>
                          {bus.plate && <div className="text-xs text-muted-foreground font-normal">{bus.plate}</div>}
                        </button>
                      </TableCell>
                      <TableCell>{bus.capacity} seats</TableCell>
                      <TableCell>
                        <div>{bus.driver}</div>
                        <div className="text-xs text-muted-foreground">
                          {drivers.find(d => d.name === bus.driver)?.phone}
                        </div>
                      </TableCell>
                      <TableCell>{bus.route}</TableCell>
                      <TableCell>
                        <Badge className={bus.status === "on-route" ? "bg-success text-success-foreground" : bus.status === "maintenance" ? "bg-destructive" : "bg-warning text-warning-foreground"}>
                          {bus.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2" onClick={() => openEditBusDialog(bus)}><Edit className="w-4 h-4" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDeleteBus(bus.id)}><Trash2 className="w-4 h-4" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Bus Details Dialog */}
          <Dialog open={!!viewingBus} onOpenChange={(open) => !open && setViewingBus(null)}>
            <DialogContent className="p-0 overflow-hidden bg-transparent border-0 shadow-none max-w-md">
              {viewingBus && (
                <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-2xl overflow-hidden">
                  <div className="absolute top-2 right-2 z-20">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => setViewingBus(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Gradient Header */}
                  <div className="h-32 bg-gradient-to-r from-orange-500 to-amber-600 relative">
                    <div className="absolute -bottom-12 left-8 p-1 bg-white dark:bg-slate-900 rounded-full">
                      <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-xl overflow-hidden">
                        <Bus className="w-12 h-12 text-orange-500" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-16 px-8 pb-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          {viewingBus.busNumber}
                          <Shield className="w-5 h-5 text-orange-500 fill-orange-500" />
                        </h2>
                        <p className="text-muted-foreground font-medium">
                          {viewingBus.plate || "No Registration"}
                        </p>
                      </div>
                      <Badge className={cn(
                        "px-3 py-1",
                        viewingBus.status === "on-route" ? "bg-green-100 text-green-700" :
                          viewingBus.status === "maintenance" ? "bg-red-100 text-red-700" :
                            "bg-amber-100 text-amber-700"
                      )}>
                        {viewingBus.status}
                      </Badge>
                    </div>

                    <div className="grid gap-4">
                      {/* Capacity */}
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Capacity</span>
                          <div className="flex items-center gap-2 font-medium">
                            <Users className="w-4 h-4 text-primary" />
                            {viewingBus.passengers || 0} / {viewingBus.capacity} Seats
                          </div>
                        </div>
                      </div>

                      {/* Route & Current Stop */}
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Assigned Route</p>
                            <p className="font-semibold text-sm">{viewingBus.route || "No Route Assigned"}</p>
                          </div>
                        </div>
                        {viewingBus.currentStop && (
                          <>
                            <div className="h-px bg-slate-200 dark:bg-slate-700" />
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                <Navigation className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Current Stop</p>
                                <p className="font-semibold text-sm">{viewingBus.currentStop}</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Driver Info */}
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                              <User className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Assigned Driver</p>
                              <p className="font-semibold">{viewingBus.driver || "No Driver Assigned"}</p>
                              <p className="text-xs text-muted-foreground">
                                {drivers.find(d => d.name === viewingBus.driver)?.phone || ""}
                              </p>
                            </div>
                          </div>
                          {viewingBus.driver && drivers.find(d => d.name === viewingBus.driver)?.phone && (
                            <Button variant="outline" size="sm" className="h-8" asChild>
                              <a href={`tel:${drivers.find(d => d.name === viewingBus.driver)?.phone}`}>
                                <Phone className="w-3 h-3 mr-2" /> Call
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Location */}
                      {viewingBus.location && (
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Location:</span>
                            <span className="font-medium">
                              {viewingBus.location.lat.toFixed(4)}, {viewingBus.location.lng.toFixed(4)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Routes Tab */}
        <TabsContent value="routes" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" /> Add Route
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Route</DialogTitle>
                  <DialogDescription>Create a new bus route.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Route Name</Label>
                    <Input
                      placeholder="Route F - Downtown"
                      value={newRoute.name}
                      onChange={e => setNewRoute({ ...newRoute, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Morning Pickup</Label>
                      <Input type="time" value={newRoute.morningTime} onChange={e => setNewRoute({ ...newRoute, morningTime: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Evening Drop</Label>
                      <Input type="time" value={newRoute.eveningTime} onChange={e => setNewRoute({ ...newRoute, eveningTime: e.target.value })} />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddRouteOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddRoute}>Add Route</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routes.map((route) => (
              <Card
                key={route.id}
                className="animate-fade-in hover:shadow-lg transition-all cursor-pointer group hover:border-blue-500 hover:ring-1 hover:ring-blue-500/50"
                onClick={() => setViewingRoute(route)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                      {route.name}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}><MoreVertical className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={(e) => openEditRouteDialog(e, route)}><Edit className="w-4 h-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={(e) => handleDeleteRoute(e, route.id)}><Trash2 className="w-4 h-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Stops</span>
                    <span className="font-medium">{route.stops.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Distance</span>
                    <span className="font-medium">{route.distance}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Est. Time</span>
                    <span className="font-medium">{route.estimatedTime}</span>
                  </div>
                </CardContent>
                <div className="px-6 pb-4 pt-0">
                  <div className="pt-3 border-t flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Bus className="w-4 h-4 text-primary" />
                      {(() => {
                        const assignedBus = buses.find(b => b.route === route.name || b.route === route.name.replace('Route ', ''));
                        return assignedBus ? (
                          <div className="flex flex-col">
                            <span>{assignedBus.busNumber}</span>
                            <span className="text-[10px] text-muted-foreground">{assignedBus.plate}</span>
                          </div>
                        ) : <span className="text-muted-foreground">No Bus Assigned</span>;
                      })()}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Route Live Map View Dialog */}
          <Dialog open={!!viewingRoute} onOpenChange={(open) => !open && setViewingRoute(null)}>
            <DialogContent className="max-w-[450px] w-full p-0 overflow-hidden flex flex-col h-[80vh] bg-slate-950 border-slate-800">
              <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
                <div>
                  <DialogTitle className="text-lg font-bold flex items-center gap-2 text-white">
                    {viewingRoute?.name}
                  </DialogTitle>
                  <div className="flex flex-col gap-0.5 mt-0.5">
                    <DialogDescription className="text-slate-400">
                      Live Status
                    </DialogDescription>
                    {(() => {
                      const assignedBus = buses.find(b => b.route === viewingRoute?.name || b.route === viewingRoute?.name.replace('Route ', ''));
                      if (!assignedBus) return null;
                      return (
                        <div className="flex items-center gap-3 text-blue-400 mt-1">
                          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <Bus className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold">Bus {assignedBus.busNumber}</span>
                            <span className="text-[10px] text-slate-400">{assignedBus.plate}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-hidden relative">
                {viewingRoute && (
                  <RouteTimeline
                    route={viewingRoute}
                    buses={buses.filter(b => b.route === viewingRoute.name || b.route === viewingRoute.name.replace('Route ', ''))}
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>


      </Tabs>
    </div>
  );
}
