import { useState } from "react";
import { Bus as BusIcon, Route as RouteIcon, Plus, Edit, Trash2, MoreVertical, MapPin, Search, ChevronRight, Clock, Navigation, Share2, MessageSquare, RefreshCw, User, Phone, Shield, Users, X, Cpu, FileText, Image } from "lucide-react";
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
import { useData } from "@/context/DataContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Extracted Components
import RouteTimeline from "@/components/admin/RouteTimeline";
import BusDetailsDialog from "@/components/admin/BusDetailsDialog";
import RouteCard from "@/components/admin/RouteCard";
import AddBusDialog from "@/components/admin/buses/AddBusDialog";
import AddRouteDialog from "@/components/admin/routes/AddRouteDialog";

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
  const [viewingDocument, setViewingDocument] = useState<{ title: string, url: string } | null>(null);

  const [newBus, setNewBus] = useState({
    busNumber: "",
    plate: "",
    capacity: 40,
    driver: "",
    status: "idle" as "idle" | "on-route" | "delayed" | "maintenance" | "completed",
    route: "",
    engineNumber: "",
    documents: {
      insurance: "",
      rc: "",
      pollution: ""
    }
  });

  const [newRoute, setNewRoute] = useState({
    name: "",
    stops: [],
    distance: "10km",
    estimatedTime: "30 mins",
    morningTime: "07:00",
    eveningTime: "15:00"
  });

  const [selectedBusForRoute, setSelectedBusForRoute] = useState<string>("none");
  const [newBusDetails, setNewBusDetails] = useState({ busNumber: "", plate: "", driver: "" });

  const getNextRouteName = () => {
    const existingNames = routes.map(r => r.name);
    // Match "Route A", "RouteA", etc.
    const pattern = /^Route\s?([A-Z])$/i;
    let maxCharCode = 64; // 'A' is 65

    existingNames.forEach(name => {
      const match = name.match(pattern);
      if (match) {
        const charCode = match[1].toUpperCase().charCodeAt(0);
        if (charCode > maxCharCode) maxCharCode = charCode;
      }
    });

    return `Route${String.fromCharCode(maxCharCode + 1)}`;
  };

  const getAssignedBus = (routeName: string) => {
    if (!routeName) return null;
    return [...buses].reverse().find(b => {
      if (!b.route) return false;
      const normalizedBusRoute = b.route.toLowerCase().replace('route', '').trim();
      const normalizedRouteName = routeName.toLowerCase().replace('route', '').trim();
      return normalizedBusRoute === normalizedRouteName;
    });
  };

  const getRouteBuses = (routeName: string) => {
    if (!routeName) return [];
    return buses.filter(b => {
      if (!b.route) return false;
      const normalizedBusRoute = b.route.toLowerCase().replace('route', '').trim();
      const normalizedRouteName = routeName.toLowerCase().replace('route', '').trim();
      return normalizedBusRoute === normalizedRouteName;
    });
  };



  /* Bus Handlers */
  const openAddBusDialog = () => {
    setEditingBusId(null);
    setNewBus({
      busNumber: "",
      plate: "",
      capacity: 40,
      driver: "",
      status: "idle",
      route: "",
      engineNumber: "",
      documents: {
        insurance: "",
        rc: "",
        pollution: ""
      }
    });
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
      route: bus.route,
      engineNumber: bus.engineNumber || "",
      documents: {
        insurance: bus.documents?.insurance || "",
        rc: bus.documents?.rc || "",
        pollution: bus.documents?.pollution || ""
      }
    });
    setIsAddBusOpen(true);
  };

  const handleAddBus = () => {
    if (!newBus.busNumber) return toast.error("Bus Number required");

    if (editingBusId) {
      // @ts-ignore
      updateBus(editingBusId, newBus);

      // Check if route exists, if not add it
      if (newBus.route && newBus.route !== 'none' && !routes.some(r => r.name === newBus.route)) {
        addRoute({
          name: newBus.route,
          stops: [],
          distance: "10km",
          estimatedTime: "30 mins",
          morningTime: "07:00",
          eveningTime: "15:00"
        });
        toast.success(`Route ${newBus.route} automatically created`);
      }

      toast.success("Bus updated");
    } else {
      // Auto-assign route to new bus
      let assignedRoute = newBus.route;

      if (!assignedRoute && routes.length > 0) {
        // Find a route with the least number of buses assigned
        const routeBusCounts = routes.map(route => ({
          route: route.name,
          count: buses.filter(b => b.route === route.name).length
        }));

        // Sort by count (ascending) and pick the first one
        routeBusCounts.sort((a, b) => a.count - b.count);
        assignedRoute = routeBusCounts[0].route;
      }

      // @ts-ignore
      addBus({ ...newBus, route: assignedRoute, passengers: 0 });

      // Check if route exists, if not add it
      if (assignedRoute && assignedRoute !== 'none' && !routes.some(r => r.name === assignedRoute)) {
        addRoute({
          name: assignedRoute,
          stops: [],
          distance: "10km",
          estimatedTime: "30 mins",
          morningTime: "07:00",
          eveningTime: "15:00"
        });
        toast.success(`Route ${assignedRoute} automatically created`);
      }

      toast.success(assignedRoute
        ? `Bus added and assigned to ${assignedRoute}`
        : "Bus added");
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

  const openCreateRouteDialog = () => {
    setEditingRouteId(null);
    const nextName = getNextRouteName();
    setNewRoute({
      name: nextName,
      stops: [],
      distance: "10km",
      estimatedTime: "30 mins",
      morningTime: "07:00",
      eveningTime: "15:00"
    });
    setSelectedBusForRoute("none");
    setNewBusDetails({ busNumber: "", plate: "", driver: "" });
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

      // Handle Bus Assignment Check
      if (selectedBusForRoute === "new_bus") {
        if (newBusDetails.busNumber) {
          // @ts-ignore
          addBus({
            busNumber: newBusDetails.busNumber,
            plate: newBusDetails.plate || "TBD",
            driver: newBusDetails.driver || "Unassigned",
            route: newRoute.name,
            status: "idle",
            capacity: 40,
            passengers: 0
          });
          toast.success("Route added & new bus created");
        }
      } else if (selectedBusForRoute && selectedBusForRoute !== "none") {
        const busToUpdate = buses.find(b => b.id === selectedBusForRoute);
        if (busToUpdate) {
          // @ts-ignore
          updateBus(busToUpdate.id, { route: newRoute.name, status: "on-route" });
          toast.success("Route added & bus assigned");
        }
      } else {
        toast.success("Route added");
      }
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
            <BusIcon className="w-4 h-4" /> Buses
          </TabsTrigger>
          <TabsTrigger value="routes" className="gap-2">
            <MapPin className="w-4 h-4" /> Routes
          </TabsTrigger>

        </TabsList>

        {/* Buses Tab */}
        <TabsContent value="buses" className="space-y-4">
          <div className="flex justify-end">
            <Button className="gap-2" onClick={openAddBusDialog}>
              <Plus className="w-4 h-4" /> Add Bus
            </Button>
            <AddBusDialog
              open={isAddBusOpen}
              onOpenChange={setIsAddBusOpen}
              bus={newBus}
              setBus={setNewBus}
              drivers={drivers}
              routes={routes}
              isEditing={!!editingBusId}
              onSave={handleAddBus}
            />
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

          <BusDetailsDialog
            bus={viewingBus}
            isOpen={!!viewingBus}
            onClose={() => setViewingBus(null)}
            onViewDocument={setViewingDocument}
          />
        </TabsContent>

        {/* Routes Tab */}
        <TabsContent value="routes" className="space-y-4">
          <div className="flex justify-end">
            <Button className="gap-2" onClick={openCreateRouteDialog}>
              <Plus className="w-4 h-4" /> Add Route
            </Button>
            <AddRouteDialog
              open={isAddRouteOpen}
              onOpenChange={setIsAddRouteOpen}
              route={newRoute}
              setRoute={setNewRoute}
              isEditing={!!editingRouteId}
              onSave={handleAddRoute}
              existingRoutes={routes}
              buses={buses}
              selectedBusForRoute={selectedBusForRoute}
              setSelectedBusForRoute={setSelectedBusForRoute}
              newBusDetails={newBusDetails}
              setNewBusDetails={setNewBusDetails}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                assignedBus={getAssignedBus(route.name)}
                onView={() => setViewingRoute(route)}
                onEdit={(e) => openEditRouteDialog(e, route)}
                onDelete={(e) => handleDeleteRoute(e, route.id)}
              />
            ))}
          </div>

          {/* Route Live Map View Dialog */}
          <Dialog open={!!viewingRoute} onOpenChange={(open) => !open && setViewingRoute(null)}>
            <DialogContent className="sm:max-w-4xl max-w-[95vw] w-full p-0 overflow-hidden flex flex-col h-[92vh] sm:h-[90vh] bg-slate-950 border-slate-800">
              <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
                <div>
                  <DialogTitle className="text-lg font-bold flex items-center gap-2 text-white">
                    {viewingRoute?.name}
                  </DialogTitle>
                  <div className="flex flex-col gap-0.5 mt-0.5">
                    <DialogDescription className="text-slate-400">Live Status</DialogDescription>
                    {(() => {
                      const assignedBus = getAssignedBus(viewingRoute?.name || '');
                      if (!assignedBus) return null;
                      const driverObj = drivers.find(d => d.name === assignedBus.driver);
                      return (
                        <div className="flex flex-col gap-2 mt-2">
                          <div className="flex items-center gap-3 text-blue-400">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                              <BusIcon className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm">{assignedBus.busNumber}</span>
                          </div>
                          {driverObj && (
                            <div className="flex items-center gap-3 text-slate-300 ml-1">
                              <User className="w-3 h-3 text-slate-500" />
                              <span className="text-xs font-medium">{driverObj.name} • {driverObj.phone}</span>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-slate-400" onClick={() => setViewingRoute(null)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                {viewingRoute && (
                  <RouteTimeline
                    route={viewingRoute}
                    buses={getRouteBuses(viewingRoute.name)}
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>

      {/* Document Image Preview Dialog */}
      <Dialog open={!!viewingDocument} onOpenChange={(open) => !open && setViewingDocument(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-transparent border-0 shadow-none">
          <div className="relative group">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all"
              onClick={() => setViewingDocument(null)}
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="relative w-full flex items-center justify-center p-2">
              {viewingDocument && (
                <img
                  src={viewingDocument.url}
                  alt={viewingDocument.title}
                  className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10"
                />
              )}
            </div>

            {viewingDocument && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white text-sm font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {viewingDocument.title}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
