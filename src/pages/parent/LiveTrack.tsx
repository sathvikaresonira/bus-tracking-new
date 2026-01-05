import { useState } from "react";
import { Bus, MapPin, Clock, Navigation, Phone, User, ChevronUp, ChevronDown, AlertTriangle, Shield, Gauge, Users, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useData } from "@/context/DataContext";
import LiveMap from "@/components/Map";

const LiveTrack = () => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);
  const { buses } = useData();

  // Simulate "My Bus" - normally would come from user profile -> student -> route -> bus
  const myBus = buses.find(b => b.id === "101") || buses[0];

  // Enhanced stops with coordinates for the map
  const stops = [
    { name: "Central Station", time: "7:00 AM", status: "passed" as const, lat: 17.3850, lng: 78.4867, eta: "7:00 AM" },
    { name: "Maple Avenue", time: "7:08 AM", status: "passed" as const, lat: 17.3950, lng: 78.4967, eta: "7:08 AM" },
    { name: "Park View", time: "7:15 AM", status: "passed" as const, lat: 17.4050, lng: 78.5067, eta: "7:15 AM" },
    { name: "Oak Street Stop #12", time: "7:23 AM", status: "next" as const, lat: 17.4150, lng: 78.5167, eta: "7:23 AM" },
    { name: "School Gate", time: "7:35 AM", status: "upcoming" as const, lat: 17.4250, lng: 78.5267, eta: "7:35 AM" },
  ];

  const nextStop = stops.find(s => s.status === "next");
  const passedStops = stops.filter(s => s.status === "passed").length;
  const totalStops = stops.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      {/* SOS Alert Banner */}
      {myBus?.isSOS && (
        <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-center gap-3 animate-pulse">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-bold">EMERGENCY ALERT - SOS Signal Received</span>
        </div>
      )}

      {/* Main Map Container - Full Width Rapido Style */}
      <div className="relative h-[60vh] w-full">
        <LiveMap
          buses={[myBus]}
          stops={stops}
          center={myBus.location ? { lat: myBus.location.lat, lng: myBus.location.lng } : undefined}
          zoom={15}
          showDriverCard={false}
        />

        {/* Floating ETA Card - Top */}
        <div className="absolute top-4 left-4 right-4 z-[400]">
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Arriving at {nextStop?.name}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-800 dark:text-white">8</span>
                    <span className="text-lg text-slate-500 dark:text-slate-400">min</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-emerald-500 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase">Live</span>
                </div>
                <Navigation className="w-6 h-6 text-slate-400 dark:text-slate-500" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>{passedStops} of {totalStops} stops completed</span>
                <span>{Math.round((passedStops / totalStops) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(passedStops / totalStops) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panel - Rapido Style Sliding Card */}
      <div className="relative -mt-8 z-[500]">
        <div className="bg-white dark:bg-slate-800 rounded-t-[2rem] shadow-2xl min-h-[40vh]">
          {/* Pull Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full" />
          </div>

          {/* Bus & Driver Header */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Bus className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">{myBus.busNumber}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{myBus.route}</p>
                  <div className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mt-1",
                    myBus.status === 'on-route' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      myBus.status === 'delayed' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  )}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    {myBus.status}
                  </div>
                </div>
              </div>

              {/* Speed Badge */}
              <div className="text-right">
                <div className="bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Gauge className="w-4 h-4 text-blue-500" />
                    <span className="text-2xl font-bold text-slate-800 dark:text-white">{myBus.speed}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">km/h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Card */}
          <div className="mx-6 mb-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-700 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-600 shadow-lg">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">{myBus.driver}</p>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs text-slate-500 dark:text-slate-400">Verified Driver • 4.8 ★</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30"
                >
                  <Phone className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
                >
                  <MessageSquare className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mx-6 mb-4 grid grid-cols-3 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
              <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-slate-800 dark:text-white">{myBus.passengers}/{myBus.capacity}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Passengers</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 text-center">
              <MapPin className="w-5 h-5 text-purple-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-slate-800 dark:text-white">{passedStops + 1}/{totalStops}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Current Stop</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-slate-800 dark:text-white">7:35</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Expected</p>
            </div>
          </div>

          {/* Harsh Driving Warning */}
          {myBus.isHarshDriving && (
            <div className="mx-6 mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="font-bold text-red-700 dark:text-red-400">Harsh Driving Alert</p>
                  <p className="text-xs text-red-600 dark:text-red-400/80">Sudden braking or acceleration detected</p>
                </div>
              </div>
            </div>
          )}

          {/* Expandable Route Section */}
          <div className="border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <span className="font-semibold text-slate-700 dark:text-slate-300">Route Timeline</span>
              {isDetailsExpanded ? (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              )}
            </button>

            {isDetailsExpanded && (
              <div className="px-6 pb-6 animate-fade-in">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-[7px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-emerald-500 via-amber-500 to-slate-300 dark:to-slate-600" />

                  {stops.map((stop, index) => (
                    <div
                      key={index}
                      className={cn(
                        "relative flex items-start gap-4 pb-4 last:pb-0",
                        stop.status === "next" && "bg-amber-50 dark:bg-amber-900/10 -mx-3 px-3 py-2 rounded-xl"
                      )}
                    >
                      {/* Status Dot */}
                      <div className={cn(
                        "relative z-10 w-4 h-4 rounded-full border-2 mt-1",
                        stop.status === "passed" && "bg-emerald-500 border-emerald-500",
                        stop.status === "next" && "bg-amber-500 border-amber-500 animate-pulse",
                        stop.status === "upcoming" && "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                      )}>
                        {stop.status === "next" && (
                          <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-50" />
                        )}
                      </div>

                      {/* Stop Info */}
                      <div className="flex-1">
                        <p className={cn(
                          "font-medium",
                          stop.status === "passed" ? "text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-white"
                        )}>
                          {stop.name}
                        </p>
                        {stop.status === "next" && (
                          <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Arriving Now</p>
                        )}
                      </div>

                      {/* Time */}
                      <span className={cn(
                        "text-sm font-medium mt-1",
                        stop.status === "passed" ? "text-slate-400 dark:text-slate-500" : "text-slate-600 dark:text-slate-300"
                      )}>
                        {stop.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrack;
