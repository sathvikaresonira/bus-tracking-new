import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddDriverDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    driver: any;
    setDriver: (driver: any) => void;
    isEditing: boolean;
    onSave: () => void;
}

export default function AddDriverDialog({
    open,
    onOpenChange,
    driver,
    setDriver,
    isEditing,
    onSave
}: AddDriverDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Driver" : "Add New Driver"}</DialogTitle>
                    <DialogDescription>{isEditing ? "Update driver details" : "Register a new driver"}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input value={driver.name} onChange={e => setDriver({ ...driver, name: e.target.value })} placeholder="Driver Name" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>License</Label>
                            <Input value={driver.license} onChange={e => setDriver({ ...driver, license: e.target.value })} placeholder="License No." />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input value={driver.phone} onChange={e => setDriver({ ...driver, phone: e.target.value })} placeholder="+1 234-567-8900" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Join Date</Label>
                            <Input type="date" value={driver.joinDate} onChange={e => setDriver({ ...driver, joinDate: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Experience (Years)</Label>
                            <Input type="number" value={driver.experience} onChange={e => setDriver({ ...driver, experience: parseInt(e.target.value) || 0 })} placeholder="5" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Address</Label>
                        <Input value={driver.address} onChange={e => setDriver({ ...driver, address: e.target.value })} placeholder="123 Main St, City" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Blood Group</Label>
                            <Input value={driver.bloodGroup} onChange={e => setDriver({ ...driver, bloodGroup: e.target.value })} placeholder="O+" />
                        </div>
                        <div className="space-y-2">
                            <Label>Emergency Contact</Label>
                            <Input value={driver.emergencyContact} onChange={e => setDriver({ ...driver, emergencyContact: e.target.value })} placeholder="+91..." />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Work History</Label>
                        <Textarea
                            value={driver.workHistory}
                            onChange={e => setDriver({ ...driver, workHistory: e.target.value })}
                            placeholder="Previous employers, roles, etc."
                            className="min-h-[80px]"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={onSave}>Save Driver</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
