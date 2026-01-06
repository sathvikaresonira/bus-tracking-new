import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Route, Bus } from "@/types";

interface AddRouteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    route: any;
    setRoute: (route: any) => void;
    isEditing: boolean;
    onSave: () => void;
    existingRoutes: Route[];
    buses: Bus[];
    selectedBusForRoute: string; // Add this
    setSelectedBusForRoute: (val: string) => void; // Add this
    newBusDetails: { busNumber: string; plate: string; driver: string; }; // Add this
    setNewBusDetails: (val: any) => void; // Add this
}

export default function AddRouteDialog({
    open,
    onOpenChange,
    route,
    setRoute,
    isEditing,
    onSave,
    existingRoutes, // renamed for clarity
    buses,
    selectedBusForRoute,
    setSelectedBusForRoute,
    newBusDetails,
    setNewBusDetails
}: AddRouteDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Route" : "Add New Route"}</DialogTitle>
                    <DialogDescription>{isEditing ? "Update route details" : "Create a new route sequence"}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Route Name ({isEditing ? 'Editable' : 'Select Available'})</Label>
                        {isEditing ? (
                            <Input
                                value={route.name}
                                onChange={(e) => setRoute({ ...route, name: e.target.value })}
                            />
                        ) : (
                            <Select
                                value={route.name}
                                onValueChange={(val) => setRoute({ ...route, name: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Route Name" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* Generate available alphabetical routes A-Z */}
                                    {Array.from({ length: 26 }, (_, i) => `Route${String.fromCharCode(65 + i)}`)
                                        .filter(name => !existingRoutes.some(r => r.name === name) || name === route.name)
                                        .map(name => (
                                            <SelectItem key={name} value={name}>
                                                {name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    {!isEditing && (
                        <div className="space-y-2">
                            <Label>Assign Bus</Label>
                            <Select value={selectedBusForRoute} onValueChange={setSelectedBusForRoute}>
                                <SelectTrigger><SelectValue placeholder="Select a bus" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">No Bus Assignment</SelectItem>
                                    <SelectItem value="new_bus">+ Create New Bus</SelectItem>
                                    {buses.filter(b => !b.route || b.route === 'none').map(b => (
                                        <SelectItem key={b.id} value={b.id}>{b.busNumber} ({b.plate})</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {!isEditing && selectedBusForRoute === 'new_bus' && (
                        <div className="border p-3 rounded-md space-y-3 bg-muted/20">
                            <p className="text-xs font-semibold text-primary">New Bus Details</p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label className="text-xs">Bus Number</Label>
                                    <Input
                                        placeholder="e.g. Bus 109"
                                        value={newBusDetails.busNumber}
                                        onChange={e => setNewBusDetails({ ...newBusDetails, busNumber: e.target.value })}
                                        className="h-8"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Plate Number</Label>
                                    <Input
                                        placeholder="TS 09..."
                                        value={newBusDetails.plate}
                                        onChange={e => setNewBusDetails({ ...newBusDetails, plate: e.target.value })}
                                        className="h-8"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Distance</Label>
                            <Input value={route.distance} onChange={e => setRoute({ ...route, distance: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Est. Time</Label>
                            <Input value={route.estimatedTime} onChange={e => setRoute({ ...route, estimatedTime: e.target.value })} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={onSave}>{isEditing ? "Update Route" : "Save Route"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
