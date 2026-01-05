import { Bus, Shield, Cpu, Users, FileText, Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface BusDetailsDialogProps {
    bus: any;
    isOpen: boolean;
    onClose: () => void;
    onViewDocument: (doc: { title: string, url: string }) => void;
}

const BusDetailsDialog = ({ bus, isOpen, onClose, onViewDocument }: BusDetailsDialogProps) => {
    if (!bus) return null;

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
                    <div className="h-24 bg-gradient-to-r from-orange-500 to-amber-600 relative">
                        <div className="absolute -bottom-10 left-6 p-1 bg-white dark:bg-slate-900 rounded-full">
                            <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-xl overflow-hidden">
                                <Bus className="w-10 h-10 text-orange-500" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 px-6 pb-6">
                        <div className="flex justify-between items-start mb-5">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    {bus.busNumber}
                                    <Shield className="w-4 h-4 text-orange-500 fill-orange-500" />
                                </h2>
                                <p className="text-xs text-muted-foreground font-medium">
                                    {bus.plate || "No Registration"}
                                </p>
                            </div>
                            <Badge className={cn(
                                "px-2 py-0.5 text-[10px]",
                                bus.status === "on-route" ? "bg-green-100 text-green-700" :
                                    bus.status === "maintenance" ? "bg-red-100 text-red-700" :
                                        "bg-amber-100 text-amber-700"
                            )}>
                                {bus.status}
                            </Badge>
                        </div>

                        <div className="grid gap-4">
                            {/* Technical Details */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Engine No.</span>
                                    <div className="flex items-center gap-2 font-medium text-xs">
                                        <Cpu className="w-3.5 h-3.5 text-primary" />
                                        {bus.engineNumber || "ENG-000-000"}
                                    </div>
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Capacity</span>
                                    <div className="flex items-center gap-2 font-medium text-xs">
                                        <Users className="w-3.5 h-3.5 text-primary" />
                                        {bus.passengers || 0} / {bus.capacity} Seats
                                    </div>
                                </div>
                            </div>

                            {/* Documents Section */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 px-1">
                                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Documents</span>
                                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                                </div>

                                <div className="space-y-2">
                                    <button
                                        onClick={() => onViewDocument({ title: "RC (Registration Certificate)", url: "/assets/docs/mock_rc.png" })}
                                        className="w-full p-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl flex items-center justify-between transition-colors group text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                <FileText className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-muted-foreground font-semibold">RC Number</p>
                                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{bus.documents?.rc || "RC-NONE-000"}</p>
                                            </div>
                                        </div>
                                        <Image className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                    </button>

                                    <button
                                        onClick={() => onViewDocument({ title: "Bus Insurance", url: "/assets/docs/mock_insurance.png" })}
                                        className="w-full p-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl flex items-center justify-between transition-colors group text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                                <Shield className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-muted-foreground font-semibold">Insurance No.</p>
                                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{bus.documents?.insurance || "INS-NONE-000"}</p>
                                            </div>
                                        </div>
                                        <Image className="w-4 h-4 text-slate-300 group-hover:text-green-500 transition-colors" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BusDetailsDialog;
