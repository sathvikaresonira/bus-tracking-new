import { useState } from "react";
import { Bus, MapPin, Clock, Navigation, Phone, User, ChevronUp, ChevronDown, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useData } from "@/context/DataContext";
import LiveMap from "@/components/Map";

const LiveTrack = () => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const { buses } = useData();

  // Simulate "My Bus" - normally would come from user profile -> student -> route -> bus
  const myBus = buses.find(b => b.id === "101") || buses[0];

  // Enhanced stops with coordinates for the map
  const stops = [
    { name: "Central Station", time: "7:00 AM", status: "passed", lat: 17.3850, lng: 78.4867 },
    { name: "Maple Avenue", time: "7:08 AM", status: "passed", lat: 17.3950, lng: 78.4967 },
    { name: "Park View", time: "7:15 AM", status: "passed", lat: 17.4050, lng: 78.5067 },
    { name: "Oak Street Stop #12", time: "7:23 AM", status: "next", lat: 17.4150, lng: 78.5167 },
    { name: "School Gate", time: "7:35 AM", status: "upcoming", lat: 17.4250, lng: 78.5267 },
  ];

  return (
    <div className="space-y-4 animate-fade-in relative">
      {/* SOS Alert for Parent */}
      {myBus?.isSOS && (
        <div className="bg-destructive text-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-pulse mb-4">
          <AlertTriangle className="w-6 h-6" />
          <div>
            <p className="font-bold">EMERGENCY ALERT</p>
            <p className="text-sm">SOS Signal received from school bus.</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="relative h-[45vh] rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
        <LiveMap
          buses={buses}
          stops={stops as any}
          center={myBus.location ? { lat: myBus.location.lat, lng: myBus.location.lng } : undefined}
          zoom={14}
        />

        {/* ETA Overlay */}
        <div className="absolute top-4 left-4 right-4 z-[400]">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl shadow-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Arriving in</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">
                    8 <span className="text-sm font-normal">minutes</span>
                  </p>
                </div>
              </div>
              <Navigation className="w-6 h-6 text-sky-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Speed Indicator */}
        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-xl px-3 py-2 shadow-lg z-[400]">
          <p className="text-xs text-slate-500 dark:text-slate-400">Speed</p>
          <div className="flex items-end gap-1">
            <p className="text-sm font-bold text-slate-800 dark:text-white">{myBus.speed} km/h</p>
            {myBus.speed && myBus.speed > 60 && (
              <span className="text-[10px] text-red-500 font-bold mb-0.5">SPEEDING</span>
            )}
          </div>
        </div>
      </div>

      {/* Bus Details Panel */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <button
          onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-800 dark:text-white">{myBus.busNumber}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{myBus.route}</p>
            </div>
          </div>
          {isDetailsExpanded ? (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {isDetailsExpanded && (
          <div className="px-4 pb-4 space-y-4 animate-fade-in">
            {/* Driver Info */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-slate-500 dark:text-slate-300" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-800 dark:text-white">{myBus.driver}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Driver</p>
              </div>
              <a
                href="#"
                className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors"
              >
                <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </a>
            </div>

            {/* Passengers */}
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <span className="text-sm text-slate-600 dark:text-slate-300">Passengers</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 dark:text-white">
                  {myBus.passengers}/{myBus.capacity}
                </span>
                <div className="w-20 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full"
                    style={{ width: `${(myBus.passengers / myBus.capacity) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Harsh Driving Warning */}
            {myBus.isHarshDriving && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  Harsh Driving
                </div>
                <p className="text-xs text-red-600/80 dark:text-red-400/80">Sudden braking or acceleration detected</p>
              </div>
            )}

            {/* Route Stops */}
            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">Route Stops</p>
              <div className="space-y-2">
                {stops.map((stop, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-lg",
                      stop.status === "next" && "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
                    )}
                  >
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      stop.status === "passed" && "bg-emerald-500",
                      stop.status === "next" && "bg-amber-500 animate-pulse",
                      stop.status === "upcoming" && "bg-slate-300 dark:bg-slate-600"
                    )} />
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm font-medium",
                        stop.status === "passed"
                          ? "text-slate-400 dark:text-slate-500"
                          : "text-slate-800 dark:text-white"
                      )}>
                        {stop.name}
                      </p>
                    </div>
                    <span className={cn(
                      "text-xs",
                      stop.status === "passed"
                        ? "text-slate-400 dark:text-slate-500"
                        : "text-slate-600 dark:text-slate-300"
                    )}>
                      {stop.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveTrack;
