import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Navigation } from "lucide-react";
import LiveMap from "@/components/Map";

export default function DriverRoute() {
    const { buses, routes } = useData();
    const myBus = buses.find(b => b.id === "101") || buses[0];
    const myRoute = routes.find(r => r.id === myBus?.route?.split(' ')[1]) || routes[0]; // simplistic matching "Route A" -> "A"

    // Mock schedule
    const schedule = [
        { stop: "Town Center", time: "07:00 AM", status: "completed" },
        { stop: "Maple Street", time: "07:15 AM", status: "current" },
        { stop: "Oak Avenue", time: "07:30 AM", status: "upcoming" },
        { stop: "Lincoln High School", time: "08:00 AM", status: "upcoming" },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">My Route</h1>
                    <p className="text-muted-foreground">Current trip and daily schedule</p>
                </div>
                <Badge className="text-lg px-4 py-2 bg-primary">{myBus?.route}</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Map Section */}
                <Card className="lg:col-span-2 h-[500px] overflow-hidden">
                    <LiveMap buses={[myBus]} zoom={14} />
                </Card>

                {/* Schedule & Stops */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" />
                                Today's Schedule
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-0">
                            {schedule.map((item, index) => (
                                <div key={index} className="relative pl-6 pb-8 last:pb-0 border-l border-slate-200 dark:border-slate-700 ml-3">
                                    <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${item.status === 'completed' ? 'bg-green-500' :
                                        item.status === 'current' ? 'bg-blue-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'
                                        }`} />
                                    <div className="flex flex-col">
                                        <span className={`font-semibold ${item.status === 'current' ? 'text-primary' : ''}`}>{item.stop}</span>
                                        <span className="text-sm text-slate-500">{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
                                    <Navigation className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100">Next Destination</h3>
                                    <p className="text-blue-700 dark:text-blue-300 font-medium mt-1">Oak Avenue</p>
                                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Est. arrival in 15 mins</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
