import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Driver, Route } from "@/types";

interface AddBusDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    bus: any;
    setBus: (bus: any) => void;
    drivers: Driver[];
    routes: Route[];
    isEditing: boolean;
    onSave: () => void;
}

export default function AddBusDialog({
    open,
    onOpenChange,
    bus,
    setBus,
    drivers,
    routes,
    isEditing,
    onSave
}: AddBusDialogProps) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Bus" : "Add New Bus"}</DialogTitle>
                    <DialogDescription>{isEditing ? "Update bus details." : "Register a new bus to the fleet."}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Bus Number</Label>
                            <Input
                                placeholder="Bus 106"
                                value={bus.busNumber}
                                onChange={e => setBus({ ...bus, busNumber: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Registration Number</Label>
                            <Input
                                placeholder="TS 09 UA 1234"
                                value={bus.plate}
                                onChange={e => setBus({ ...bus, plate: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Capacity</Label>
                            <Input type="number" placeholder="40"
                                value={bus.capacity}
                                onChange={e => setBus({ ...bus, capacity: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select value={bus.status} onValueChange={(val: any) => setBus({ ...bus, status: val })}>
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
                            <Label>Assign Driver</Label>
                            <Select onValueChange={(val) => setBus({ ...bus, driver: val })} value={bus.driver}>
                                <SelectTrigger><SelectValue placeholder="Select driver" /></SelectTrigger>
                                <SelectContent>
                                    {drivers.length > 0 ? drivers.map((d) => (
                                        <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                                    )) : <SelectItem value="john">John Doe (Mock)</SelectItem>}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Assign Route</Label>
                            <Select onValueChange={(val) => setBus({ ...bus, route: val })} value={bus.route}>
                                <SelectTrigger><SelectValue placeholder="Select route" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">No Route</SelectItem>
                                    {(() => {
                                        // Generate RouteA - RouteZ
                                        const alphabetRoutes = Array.from({ length: 26 }, (_, i) => `Route${String.fromCharCode(65 + i)}`);
                                        // Merge with existing route names to preserve legacy data like "Route A"
                                        const existingNames = routes.map(r => r.name);
                                        const allOptions = Array.from(new Set([...alphabetRoutes, ...existingNames])).sort((a, b) => {
                                            // Smart sort to handle Route 10 vs Route 2 if needed, though mostly A-Z
                                            return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
                                        });

                                        return allOptions.map((name) => (
                                            <SelectItem key={name} value={name}>{name}</SelectItem>
                                        ));
                                    })()}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={onSave}>{isEditing ? "Update Bus" : "Add Bus"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
