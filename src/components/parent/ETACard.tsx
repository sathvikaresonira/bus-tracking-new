import { Clock, MapPin, Navigation } from "lucide-react";
import { useEffect, useState } from "react";

interface ETACardProps {
  etaMinutes: number;
  stopName: string;
  distance: string;
}

const ETACard = ({ etaMinutes, stopName, distance }: ETACardProps) => {
  const [displayMinutes, setDisplayMinutes] = useState(etaMinutes);

  // Countdown effect
  useEffect(() => {
    setDisplayMinutes(etaMinutes);
    const interval = setInterval(() => {
      setDisplayMinutes((prev) => Math.max(0, prev - 1));
    }, 60000);
    return () => clearInterval(interval);
  }, [etaMinutes]);

  const isArriving = displayMinutes <= 2;

  return (
    <div className={`relative overflow-hidden rounded-3xl transition-all duration-500 ${
      isArriving 
        ? "bg-gradient-to-br from-emerald-500 to-green-600 shadow-xl shadow-emerald-300/50" 
        : "bg-gradient-to-br from-sky-500 to-blue-600 shadow-xl shadow-sky-300/50"
    }`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-white/80 mb-1">
              {isArriving ? "Arriving Now!" : "Bus Arriving In"}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-white tabular-nums">
                {displayMinutes}
              </span>
              <span className="text-xl font-medium text-white/80">min</span>
            </div>
          </div>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
            isArriving ? "bg-white/30" : "bg-white/20"
          }`}>
            {isArriving ? (
              <Navigation className="w-7 h-7 text-white animate-bounce" />
            ) : (
              <Clock className="w-7 h-7 text-white" />
            )}
          </div>
        </div>

        {/* Stop Info */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{stopName}</p>
              <p className="text-xs text-white/70">{distance} away</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-1000"
              style={{ width: `${Math.max(5, 100 - (displayMinutes / 30) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETACard;
