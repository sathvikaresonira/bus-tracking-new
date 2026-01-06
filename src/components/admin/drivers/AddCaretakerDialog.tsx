import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddCaretakerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    caretaker: any;
    setCaretaker: (caretaker: any) => void;
    isEditing: boolean;
    onSave: () => void;
}

export default function AddCaretakerDialog({
    open,
    onOpenChange,
    caretaker,
    setCaretaker,
    isEditing,
    onSave
}: AddCaretakerDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Caretaker" : "Add New Caretaker"}</DialogTitle>
                    <DialogDescription>{isEditing ? "Update caretaker details" : "Register a new caretaker"}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input value={caretaker.name} onChange={e => setCaretaker({ ...caretaker, name: e.target.value })} placeholder="Caretaker Name" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input value={caretaker.phone} onChange={e => setCaretaker({ ...caretaker, phone: e.target.value })} placeholder="+91 98765 43210" />
                        </div>
                        <div className="space-y-2">
                            <Label>Experience (Years)</Label>
                            <Input type="number" value={caretaker.experience} onChange={e => setCaretaker({ ...caretaker, experience: parseInt(e.target.value) || 0 })} placeholder="3" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Join Date</Label>
                            <Input type="date" value={caretaker.joinDate} onChange={e => setCaretaker({ ...caretaker, joinDate: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Blood Group</Label>
                            <Input value={caretaker.bloodGroup} onChange={e => setCaretaker({ ...caretaker, bloodGroup: e.target.value })} placeholder="O+" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Address</Label>
                        <Input value={caretaker.address} onChange={e => setCaretaker({ ...caretaker, address: e.target.value })} placeholder="123 Main St, City" />
                    </div>
                    <div className="space-y-2">
                        <Label>Emergency Contact</Label>
                        <Input value={caretaker.emergencyContact} onChange={e => setCaretaker({ ...caretaker, emergencyContact: e.target.value })} placeholder="+91..." />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={onSave}>Save Caretaker</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
