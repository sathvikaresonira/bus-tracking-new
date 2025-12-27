import { useState } from "react";
import { Bus, Route as RouteIcon, Plus, Edit, Trash2, MoreVertical, User, MapPin, Search } from "lucide-react";
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

export default function Buses() {
  const { buses, routes, drivers, addBus, deleteBus, updateBus, addRoute, deleteRoute, updateRoute, addDriver, deleteDriver, updateDriver, searchQuery: globalSearchQuery } = useData();
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const searchQuery = globalSearchQuery || localSearchQuery;
  const [editingBusId, setEditingBusId] = useState<string | null>(null);
  const [editingDriverId, setEditingDriverId] = useState<string | null>(null);
  const [editingRouteId, setEditingRouteId] = useState<string | null>(null);

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

  const [newDriver, setNewDriver] = useState({
    name: "",
    license: "",
    phone: "",
    status: "active" as "active" | "on-leave"
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
    deleteBus(id);
    toast.success("Bus deleted");
  };

  /* Route Handlers */
  const openEditRouteDialog = (route: any) => {
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

  const handleDeleteRoute = (id: string) => {
    deleteRoute(id);
    toast.success("Route deleted");
  };

  /* Driver Handlers */
  const openAddDriverDialog = () => {
    setEditingDriverId(null);
    setNewDriver({ name: "", license: "", phone: "", status: "active" });
    setIsAddDriverOpen(true);
  };

  const openEditDriverDialog = (driver: any) => {
    setEditingDriverId(driver.id);
    setNewDriver({
      name: driver.name,
      license: driver.license,
      phone: driver.phone,
      status: driver.status
    });
    setIsAddDriverOpen(true);
  };

  const handleAddDriver = () => {
    if (!newDriver.name) return toast.error("Driver Name required");

    if (editingDriverId) {
      updateDriver(editingDriverId, newDriver);
      toast.success("Driver updated");
    } else {
      addDriver(newDriver);
      toast.success("Driver added");
    }
    setIsAddDriverOpen(false);
    setEditingDriverId(null);
  };

  const handleDeleteDriver = (id: string) => {
    deleteDriver(id);
    toast.success("Driver deleted");
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
          <TabsTrigger value="drivers" className="gap-2">
            <User className="w-4 h-4" /> Drivers
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Capacity</Label>
                      <Input type="number" placeholder="40"
                        value={newBus.capacity}
                        onChange={e => setNewBus({ ...newBus, capacity: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Assign Driver</Label>
                      <Select onValueChange={(val) => setNewBus({ ...newBus, driver: val })}>
                        <SelectTrigger><SelectValue placeholder="Select driver" /></SelectTrigger>
                        <SelectContent>
                          {drivers.length > 0 ? drivers.map((d) => (
                            <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                          )) : <SelectItem value="john">John Doe (Mock)</SelectItem>}
                        </SelectContent>
                      </Select>
                    </div>
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
                      <TableCell className="font-medium">{bus.busNumber}</TableCell>
                      <TableCell>{bus.capacity} seats</TableCell>
                      <TableCell>{bus.driver}</TableCell>
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
              <Card key={route.id} className="animate-fade-in hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{route.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={() => openEditRouteDialog(route)}><Edit className="w-4 h-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDeleteRoute(route.id)}><Trash2 className="w-4 h-4" /> Delete</DropdownMenuItem>
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
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Drivers Tab */}
        <TabsContent value="drivers" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isAddDriverOpen} onOpenChange={setIsAddDriverOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" onClick={openAddDriverDialog}>
                  <Plus className="w-4 h-4" /> Add Driver
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingDriverId ? "Edit Driver" : "Add New Driver"}</DialogTitle>
                  <DialogDescription>{editingDriverId ? "Update driver details" : "Register a new driver"}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input value={newDriver.name} onChange={e => setNewDriver({ ...newDriver, name: e.target.value })} placeholder="Driver Name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>License</Label>
                      <Input value={newDriver.license} onChange={e => setNewDriver({ ...newDriver, license: e.target.value })} placeholder="License No." />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input value={newDriver.phone} onChange={e => setNewDriver({ ...newDriver, phone: e.target.value })} placeholder="+1 234-567-8900" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDriverOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddDriver}>Save Driver</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="animate-fade-in">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No drivers found.</TableCell>
                    </TableRow>
                  ) : drivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">{driver.name}</TableCell>
                      <TableCell>{driver.license}</TableCell>
                      <TableCell>{driver.phone}</TableCell>
                      <TableCell>
                        <Badge variant={driver.status === 'active' ? 'default' : 'secondary'}>{driver.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2" onClick={() => openEditDriverDialog(driver)}><Edit className="w-4 h-4" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDeleteDriver(driver.id)}><Trash2 className="w-4 h-4" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
