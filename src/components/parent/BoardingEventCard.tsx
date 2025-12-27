import { Bus, ArrowRight, School, Home, MapPin, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type TripType = "to-school" | "to-home";
type EventType = "boarding" | "alighting";

interface BoardingEventCardProps {
  tripType: TripType;
  eventType: EventType;
  timestamp: string;
  location: string;
  coordinates?: string;
  busNumber: string;
  isDelayed?: boolean;
  delayMinutes?: number;
}

const BoardingEventCard = ({
  tripType,
  eventType,
  timestamp,
  location,
  coordinates,
  busNumber,
  isDelayed = false,
  delayMinutes = 0,
}: BoardingEventCardProps) => {
  const isToSchool = tripType === "to-school";
  const isBoarding = eventType === "boarding";

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border-l-4 shadow-sm hover:shadow-md transition-all duration-200",
      isToSchool 
        ? "border-l-sky-500" 
        : "border-l-violet-500"
    )}>
      {/* Delay Warning Banner */}
      {isDelayed && (
        <div className="bg-amber-50 dark:bg-amber-900/30 px-4 py-2 flex items-center gap-2 text-amber-700 dark:text-amber-400">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-xs font-medium">Delayed by {delayMinutes} minutes</span>
        </div>
      )}

      <div className="p-4">
        {/* Header with Trip Type */}
        <div className="flex items-center justify-between mb-3">
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
            isToSchool
              ? "bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300"
              : "bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300"
          )}>
            {isToSchool ? (
              <>
                <Home className="w-3 h-3" />
                <ArrowRight className="w-3 h-3" />
                <School className="w-3 h-3" />
                <span>To School</span>
              </>
            ) : (
              <>
                <School className="w-3 h-3" />
                <ArrowRight className="w-3 h-3" />
                <Home className="w-3 h-3" />
                <span>Return Home</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-medium">
              {isBoarding ? "Boarded" : "Alighted"}
            </span>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              isToSchool
                ? "bg-sky-100 dark:bg-sky-900/50"
                : "bg-violet-100 dark:bg-violet-900/50"
            )}>
              <Bus className={cn(
                "w-5 h-5",
                isToSchool ? "text-sky-600 dark:text-sky-400" : "text-violet-600 dark:text-violet-400"
              )} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-800 dark:text-white">
                Bus {busNumber}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isBoarding ? "Student boarded the bus" : "Student got off the bus"}
              </p>
            </div>
          </div>

          {/* Time & Location */}
          <div className="pl-13 space-y-1.5 ml-13">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{timestamp}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{location}</span>
            </div>
            {coordinates && (
              <p className="text-xs text-slate-400 dark:text-slate-500 ml-6">
                GPS: {coordinates}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingEventCard;
