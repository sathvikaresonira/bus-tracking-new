import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SOSAlertOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onResolve: () => void;
    message: string;
}

const SOSAlertOverlay = ({ isOpen, onClose, onResolve, message }: SOSAlertOverlayProps) => {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 pointer-events-auto flex items-center justify-center z-50 overflow-hidden bg-background/80 backdrop-blur-sm">
            <div className="text-[12rem] md:text-[15rem] font-black text-destructive/10 -rotate-12 select-none animate-pulse whitespace-nowrap absolute">
                DRUNK DRIVER
            </div>
            <div className="relative bg-card border-2 border-destructive p-8 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300 max-w-lg w-full mx-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                >
                    <span className="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center animate-bounce">
                        <Bell className="w-8 h-8 text-destructive" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-destructive">CRITICAL WARNING</h2>
                        <p className="text-muted-foreground mt-2">{message}</p>
                    </div>
                    <div className="flex gap-3 w-full mt-4">
                        <Button variant="outline" className="flex-1" onClick={onClose}>
                            Dismiss View
                        </Button>
                        <Button variant="destructive" className="flex-1" onClick={onResolve}>
                            Resolve Issue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SOSAlertOverlay;
