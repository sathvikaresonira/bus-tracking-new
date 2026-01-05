import { Bus, MapPin, Clock, Navigation, RefreshCw, X, Users, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bus as BusType, Route } from "@/types";

interface BusLiveDetailsProps {
    bus: BusType;
    route?: Route;
    onClose: () => void;
    onRefresh: () => void;
}

const statusStyles = {
    "on-route": { bg: "bg-success", text: "On Route", color: "text-success" },
    "idle": { bg: "bg-muted-foreground", text: "Idle", color: "text-muted-foreground" },
    "delayed": { bg: "bg-warning", text: "Delayed", color: "text-warning" },
    "completed": { bg: "bg-primary", text: "Completed", color: "text-primary" },
    "maintenance": { bg: "bg-destructive", text: "Maintenance", color: "text-destructive" },
};

// Generate mock times for stops
const generateStopTimes = (stops: string[], isDelayed: boolean) => {
    const now = new Date();
    const baseHour = 8; // 8 AM start

    return stops.map((stop, index) => {
        const scheduledArrival = new Date(now);
        scheduledArrival.setHours(baseHour, index * 15, 0);

        const scheduledDeparture = new Date(scheduledArrival);
        scheduledDeparture.setMinutes(scheduledArrival.getMinutes() + 2);

        const actualArrival = new Date(scheduledArrival);
        const actualDeparture = new Date(scheduledDeparture);

        // Add delay if bus is delayed
        if (isDelayed && index > 0) {
            const delayMinutes = Math.floor(Math.random() * 10) + 5;
            actualArrival.setMinutes(actualArrival.getMinutes() + delayMinutes);
            actualDeparture.setMinutes(actualDeparture.getMinutes() + delayMinutes);
        }

        return {
            name: stop,
            scheduledArrival: scheduledArrival.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
            scheduledDeparture: scheduledDeparture.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
            actualArrival: actualArrival.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
            actualDeparture: actualDeparture.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
            distance: `${index * 5} km`,
            isDelayed: isDelayed && actualArrival > scheduledArrival,
        };
    });
};

export function BusLiveDetails({ bus, route, onClose, onRefresh }: BusLiveDetailsProps) {
    const stops = route?.stops || ["Stop 1", "Stop 2", "Stop 3", "School"];
    const stopTimes = generateStopTimes(stops, bus.status === "delayed");

    // Find current stop index
    const currentStopIndex = bus.currentStop
        ? stops.findIndex(s => s.toLowerCase().includes(bus.currentStop?.toLowerCase() || ""))
        : Math.floor(stops.length / 2);

    const progressPercent = ((currentStopIndex + 1) / stops.length) * 100;
    const nextStopIndex = currentStopIndex + 1 < stops.length ? currentStopIndex + 1 : currentStopIndex;
    const destination = stops[stops.length - 1];

    // Calculate delay
    const delayMinutes = bus.status === "delayed" ? Math.floor(Math.random() * 20) + 10 : 0;

    return (
        <Card className="animate-fade-in h-full flex flex-col bg-gradient-to-b from-card to-card/95">
            <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Bus className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">{bus.busNumber}</CardTitle>
                            <p className="text-xs text-muted-foreground">{route?.name || bus.route}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className={cn("text-xs text-white", statusStyles[bus.status].bg)}>
                            {statusStyles[bus.status].text}
                        </Badge>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Live Stats Row */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-muted/50 rounded-lg p-2 text-center">
                        <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <p className="text-xs text-muted-foreground">Passengers</p>
                        <p className="font-semibold text-sm">{bus.passengers}/{bus.capacity}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2 text-center">
                        <Gauge className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <p className="text-xs text-muted-foreground">Speed</p>
                        <p className="font-semibold text-sm">{bus.speed || 0} km/h</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2 text-center">
                        <MapPin className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="font-semibold text-sm truncate">{bus.district || "N/A"}</p>
                    </div>
                </div>

                {/* Timeline Header */}
                <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
                    <span>Arrival</span>
                    <span className="font-medium">{new Date().toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' })}</span>
                    <span>Departure</span>
                </div>

                {/* Stops Timeline */}
                <div className="space-y-0 relative">
                    {stopTimes.map((stop, index) => {
                        const isCurrent = index === currentStopIndex;
                        const isPast = index < currentStopIndex;
                        const isFuture = index > currentStopIndex;

                        return (
                            <div key={index} className="flex items-start gap-3 relative">
                                {/* Left Time */}
                                <div className="w-16 text-right flex-shrink-0">
                                    <p className={cn("text-xs font-medium", isPast ? "text-muted-foreground" : "text-foreground")}>
                                        {stop.scheduledArrival}
                                    </p>
                                    {stop.isDelayed && (
                                        <p className="text-xs text-orange-500">{stop.actualArrival}</p>
                                    )}
                                </div>

                                {/* Timeline Line & Dot */}
                                <div className="flex flex-col items-center flex-shrink-0">
                                    <div className={cn(
                                        "w-3 h-3 rounded-full border-2 z-10",
                                        isCurrent ? "bg-primary border-primary ring-4 ring-primary/20" :
                                            isPast ? "bg-primary border-primary" : "bg-background border-muted-foreground"
                                    )}>
                                        {isCurrent && (
                                            <div className="w-full h-full rounded-full bg-primary animate-pulse" />
                                        )}
                                    </div>
                                    {index < stops.length - 1 && (
                                        <div className={cn(
                                            "w-0.5 h-12",
                                            isPast ? "bg-primary" : "bg-muted-foreground/30"
                                        )} />
                                    )}
                                </div>

                                {/* Stop Info */}
                                <div className="flex-1 pb-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className={cn(
                                                "font-medium text-sm",
                                                isCurrent ? "text-primary" : isPast ? "text-muted-foreground" : "text-foreground"
                                            )}>
                                                {stop.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{stop.distance}</p>
                                            {isCurrent && (
                                                <p className="text-xs text-primary font-medium mt-1">📍 Current Location</p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <p className={cn("text-xs font-medium", isPast ? "text-muted-foreground" : "text-foreground")}>
                                                {stop.scheduledDeparture}
                                            </p>
                                            {stop.isDelayed && (
                                                <p className="text-xs text-orange-500">{stop.actualDeparture}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Current Location Card */}
                <div className="bg-slate-900 rounded-xl p-4 text-white space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={cn("font-semibold", statusStyles[bus.status].color)}>
                                At {bus.currentStop || stops[currentStopIndex]}
                            </p>
                            <p className="text-xs text-slate-400">Updated few seconds ago</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onRefresh}
                            className="h-10 w-10 rounded-full bg-slate-800 hover:bg-slate-700"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span>{stops[0]}</span>
                            <span>{destination}</span>
                        </div>
                        <div className="relative h-2 bg-slate-700 rounded-full">
                            <div
                                className="absolute h-full bg-primary rounded-full transition-all duration-500"
                                style={{ width: `${progressPercent}%` }}
                            />
                            <div
                                className="absolute w-4 h-4 bg-primary rounded-full -top-1 transform -translate-x-1/2 border-2 border-white shadow-lg"
                                style={{ left: `${progressPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Next Stop & Destination */}
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-700">
                        <div>
                            <p className="text-xs text-slate-400">Next Stop</p>
                            <p className="font-semibold">{stops[nextStopIndex]}</p>
                            <p className="text-xs text-slate-400">{(nextStopIndex - currentStopIndex) * 5}km - {stopTimes[nextStopIndex]?.scheduledArrival}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-400">To Reach</p>
                            <p className="font-semibold">{destination}</p>
                            <p className="text-xs text-slate-400">{(stops.length - currentStopIndex - 1) * 5}km - {stopTimes[stops.length - 1]?.scheduledArrival}</p>
                        </div>
                    </div>

                    {/* Delay Warning */}
                    {bus.status === "delayed" && (
                        <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-3 text-center">
                            <p className="text-sm text-orange-400 font-medium">
                                ⚠️ Delayed by {delayMinutes} minutes at {bus.currentStop || stops[currentStopIndex]}
                            </p>
                        </div>
                    )}



                    {/* Harsh Driving Alert */}
                    {bus.isHarshDriving && (
                        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-center">
                            <p className="text-sm text-red-400 font-medium">
                                ⚠️ Harsh Driving Detected
                            </p>
                        </div>
                    )}
                </div>

                {/* Driver Info */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-lg">👤</span>
                        </div>
                        <div>
                            <p className="font-medium text-sm">{bus.driver}</p>
                            <p className="text-xs text-muted-foreground">Driver</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                        <Navigation className="w-3 h-3" />
                        Track
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
