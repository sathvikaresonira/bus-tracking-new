import { X, Shield, GraduationCap, CreditCard, MapPin, Bus, User, Phone, Home, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Student } from "@/types";

interface StudentDetailsDialogProps {
    student: Student | null;
    isOpen: boolean;
    onClose: () => void;
    buses: any[];
}

const StudentDetailsDialog = ({ student, isOpen, onClose, buses }: StudentDetailsDialogProps) => {
    if (!student) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="p-0 overflow-hidden bg-transparent border-0 shadow-none max-w-sm">
                <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-2xl overflow-hidden">
                    <div className="absolute top-2 right-2 z-20">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-white"
                            onClick={onClose}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Gradient Header */}
                    <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                        <div className="absolute -bottom-10 left-6 p-1 bg-white dark:bg-slate-900 rounded-full">
                            <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-xl overflow-hidden">
                                {student.profileImage ? (
                                    <img src={student.profileImage} alt={student.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-10 h-10 text-slate-400" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 px-6 pb-6">
                        <div className="flex justify-between items-start mb-5">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    {student.name}
                                    <Shield className="w-4 h-4 text-blue-500 fill-blue-500" />
                                </h2>
                                <p className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4" />
                                    {student.class} • Roll: {student.rollNumber || "N/A"}
                                </p>
                            </div>
                            <Badge className={`px-2 py-0.5 text-[10px] ${student.status === "active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"}`}>
                                {student.status}
                            </Badge>
                        </div>

                        <div className="grid gap-4">
                            {/* Basic Info */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">RFID Card</span>
                                    <div className="flex items-center gap-1.5 font-medium overflow-hidden mt-0.5">
                                        <CreditCard className="w-3 h-3 text-primary shrink-0" />
                                        <span className="truncate text-xs">{student.rfid}</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">Route</span>
                                    <div className="flex items-center gap-1.5 font-medium overflow-hidden mt-0.5">
                                        <MapPin className="w-3 h-3 text-primary shrink-0" />
                                        <span className="truncate text-xs">{student.route}</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">Bus</span>
                                    <div className="flex items-center gap-1.5 font-medium overflow-hidden mt-0.5">
                                        <Bus className="w-3 h-3 text-primary shrink-0" />
                                        <div className="flex flex-col truncate leading-tight">
                                            <span className="truncate font-bold text-xs">
                                                {student.assignedBus ? `Bus ${student.assignedBus}` : "N/A"}
                                            </span>
                                            {student.assignedBus && buses.find(b => b.id === student.assignedBus)?.plate && (
                                                <span className="text-[9px] text-muted-foreground truncate">
                                                    {buses.find(b => b.id === student.assignedBus)?.plate}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Parent & Guardian Info */}
                            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-2.5">
                                {/* Parent Contact */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                            <User className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground">Parent Name</p>
                                            <p className="font-semibold text-xs">{student.parent || "N/A"}</p>
                                            <p className="text-[10px] text-muted-foreground">{student.phone || "N/A"}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="h-7 text-xs px-2" asChild disabled={!student.phone}>
                                        <a href={`tel:${student.phone}`}>
                                            <Phone className="w-3 h-3 mr-1" /> Call
                                        </a>
                                    </Button>
                                </div>

                                {/* Guardian Contact */}
                                {(student.guardianName || student.guardianPhone) && (
                                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-300 dark:border-slate-600">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center">
                                                <User className="w-3.5 h-3.5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-muted-foreground">Guardian</p>
                                                <p className="font-semibold text-xs">{student.guardianName || "N/A"}</p>
                                                {student.guardianPhone && (
                                                    <p className="text-[10px] text-muted-foreground">{student.guardianPhone}</p>
                                                )}
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="h-7 text-xs px-2" asChild disabled={!student.guardianPhone}>
                                            <a href={`tel:${student.guardianPhone}`}>
                                                <Phone className="w-3 h-3 mr-1" /> Call
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Address & Personal */}
                            <div className="grid gap-2">
                                <div className="flex items-start gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <Home className="w-4 h-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-[10px] text-muted-foreground font-semibold">Address</p>
                                        <p className="text-xs">{student.address || "No address provided"}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-[10px] text-muted-foreground font-semibold">DOB</p>
                                            <p className="text-xs">{student.dob || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                        <span className="text-base font-bold text-red-500">
                                            {student.bloodGroup || "N/A"}
                                        </span>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground font-semibold">Blood Group</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default StudentDetailsDialog;
