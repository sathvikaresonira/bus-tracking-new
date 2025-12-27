import { Bus, Home, School, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type StudentStatus = "home" | "on-bus-to-school" | "at-school" | "on-bus-to-home";

interface StatusCardProps {
  studentName: string;
  studentPhoto?: string;
  studentClass: string;
  status: StudentStatus;
  lastUpdate: string;
  busNumber?: string;
}

const statusConfig = {
  "home": {
    label: "At Home",
    description: "Safe at home",
    icon: Home,
    gradient: "from-emerald-400 to-green-500",
    bgGlow: "bg-emerald-400/20",
    shadowColor: "shadow-emerald-300/50",
  },
  "on-bus-to-school": {
    label: "On Bus to School",
    description: "Heading to school",
    icon: Bus,
    gradient: "from-amber-400 to-orange-500",
    bgGlow: "bg-amber-400/20",
    shadowColor: "shadow-amber-300/50",
  },
  "at-school": {
    label: "At School",
    description: "Safely at school",
    icon: School,
    gradient: "from-sky-400 to-blue-500",
    bgGlow: "bg-sky-400/20",
    shadowColor: "shadow-sky-300/50",
  },
  "on-bus-to-home": {
    label: "On Bus Home",
    description: "Coming back home",
    icon: Bus,
    gradient: "from-violet-400 to-purple-500",
    bgGlow: "bg-violet-400/20",
    shadowColor: "shadow-violet-300/50",
  },
};

const StatusCard = ({ studentName, studentPhoto, studentClass, status, lastUpdate, busNumber }: StatusCardProps) => {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-xl">
      {/* Background Glow */}
      <div className={cn("absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-60", config.bgGlow)} />
      
      <div className="relative p-6">
        {/* Student Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center overflow-hidden">
              {studentPhoto ? (
                <img src={studentPhoto} alt={studentName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-slate-500 dark:text-slate-300">
                  {studentName.charAt(0)}
                </span>
              )}
            </div>
            <div className={cn(
              "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center",
              `bg-gradient-to-br ${config.gradient} shadow-lg ${config.shadowColor}`
            )}>
              <StatusIcon className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{studentName}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{studentClass}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full",
          `bg-gradient-to-r ${config.gradient} shadow-lg ${config.shadowColor}`
        )}>
          <StatusIcon className="w-4 h-4 text-white" />
          <span className="text-sm font-semibold text-white">{config.label}</span>
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{config.description}</p>

        {/* Bus Info */}
        {busNumber && (status === "on-bus-to-school" || status === "on-bus-to-home") && (
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Bus className="w-4 h-4" />
            <span>Bus {busNumber}</span>
          </div>
        )}

        {/* Last Update */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <Clock className="w-3 h-3" />
          <span>Updated {lastUpdate}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
