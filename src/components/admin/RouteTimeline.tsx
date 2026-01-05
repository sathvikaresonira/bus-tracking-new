import { Bus, Clock, Share2, Navigation, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RouteTimelineProps {
    route: any;
    buses: any[];
}

const RouteTimeline = ({ route, buses }: RouteTimelineProps) => {
    // Mock current status logic
    const activeBus = buses.find(b => b.status === "on-route") || buses[0];
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
            arrivalTime: arrivalTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            departureTime: departureTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
            <div className="flex-1 overflow-y-auto p-3 sm:p-8 custom-scrollbar">
                {/* Column Headers */}
                <div className="flex text-[10px] sm:text-sm text-slate-500 font-semibold mb-4 sm:mb-6 px-2 sm:px-4">
                    <div className="w-14 sm:w-24 text-right pr-2 sm:pr-4">Arrival</div>
                    <div className="w-10 sm:w-20"></div> {/* Spacer for timeline line */}
                    <div className="flex-1">Station / Stop Name</div>
                    <div className="w-14 sm:w-24 text-right pl-2 sm:pl-4">Departure</div>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[63px] sm:left-[118px] top-4 bottom-4 w-1 bg-slate-700/50 rounded-full z-0"></div>

                    {/* Completed Line Overlay */}
                    <div
                        className="absolute left-[63px] sm:left-[118px] top-4 w-1 bg-blue-500 rounded-full z-0 transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                        style={{ height: `${(currentStopIndex / (scheduleData.length - 1)) * 100}%` }}
                    ></div>

                    {scheduleData.map((stop: any, index: number) => (
                        <div key={index} className={cn("flex items-start min-h-[80px] sm:min-h-[100px] group relative z-10", stop.isCurrent && "mt-4 mb-4 sm:mt-6 sm:mb-6")}>
                            {/* Left: Arrival Time */}
                            <div className="w-14 sm:w-24 text-right pt-2 pr-2 sm:pr-4 shrink-0">
                                <div className={cn("text-xs sm:text-base font-bold", stop.isPassed ? "text-slate-500" : "text-white")}>
                                    {stop.arrivalTime}
                                </div>
                                {stop.isCurrent && (
                                    <div className="text-[8px] sm:text-[10px] text-blue-400 font-bold tracking-tighter mt-1 animate-pulse uppercase">LIVE</div>
                                )}
                            </div>

                            {/* Center: Timeline Marker */}
                            <div className="w-10 sm:w-20 flex flex-col items-center justify-start relative pt-2 shrink-0">
                                {stop.isCurrent ? (
                                    <div className="relative z-20">
                                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)] sm:shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse ring-2 sm:ring-4 ring-slate-950">
                                            <Bus className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cn(
                                        "w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 z-20 transition-all duration-300 ring-2 sm:ring-4 ring-slate-950",
                                        stop.isPassed ? "border-blue-500 bg-blue-500" : "border-slate-600 bg-slate-900",
                                        "group-hover:scale-125"
                                    )}></div>
                                )}
                            </div>

                            {/* Right: Station Info */}
                            <div className={cn(
                                "flex-1 pt-2 pb-6 sm:pb-10 border-b border-slate-800/50 group-last:border-0 pl-2 sm:pl-4 transition-colors",
                                stop.isCurrent ? "bg-blue-500/5 rounded-lg sm:rounded-xl border-blue-500/20 px-2 sm:px-4" : ""
                            )}>
                                <div className="flex justify-between items-start gap-2 sm:gap-4">
                                    <div className="min-w-0 flex-1">
                                        <div className={cn("font-bold transition-all truncate sm:whitespace-normal",
                                            stop.isCurrent ? "text-blue-400 text-lg sm:text-2xl" : "text-slate-100 text-sm sm:text-lg",
                                            stop.isPassed && "text-slate-400"
                                        )}>
                                            {stop.name}
                                        </div>
                                        <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2 overflow-x-auto no-scrollbar">
                                            <span className="text-[10px] sm:text-xs text-slate-500 font-medium shrink-0">{stop.distance}</span>
                                            <span className="text-[10px] sm:text-xs text-slate-400 bg-slate-800 border border-slate-700/50 rounded-md px-1.5 sm:px-2 py-0.5 font-semibold shrink-0">{stop.platform}</span>
                                        </div>
                                    </div>

                                    {/* Right: Departure Time */}
                                    <div className="w-14 sm:w-24 text-right pl-2 sm:pl-4 shrink-0">
                                        <div className={cn("text-xs sm:text-base font-bold",
                                            stop.isPassed ? "text-slate-500" : "text-red-400"
                                        )}>
                                            {stop.departureTime}
                                        </div>
                                        {!stop.isPassed && !stop.isCurrent && (
                                            <div className="text-[8px] sm:text-[10px] text-slate-500 mt-1 uppercase font-semibold">Scheduled</div>
                                        )}
                                    </div>
                                </div>

                                {stop.isCurrent && (
                                    <div className="mt-3 sm:mt-4 bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-blue-500/20 shadow-inner">
                                        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-blue-400 font-bold uppercase tracking-widest mb-1 sm:mb-2">
                                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-ping"></span>
                                            Status
                                        </div>
                                        <div className="text-xs sm:text-base text-slate-200 font-medium">Picking up students at <span className="text-white font-bold">{stop.name}</span>.</div>
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

export default RouteTimeline;
