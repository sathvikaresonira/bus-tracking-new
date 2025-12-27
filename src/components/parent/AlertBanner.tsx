import { AlertTriangle, X, Bus, WifiOff, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type AlertType = "delay" | "incident" | "offline" | "geofence";

interface AlertBannerProps {
  type: AlertType;
  title: string;
  message: string;
  timestamp: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const alertConfig = {
  delay: {
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-900/30",
    borderColor: "border-amber-400",
    textColor: "text-amber-800 dark:text-amber-200",
  },
  incident: {
    icon: AlertTriangle,
    gradient: "from-red-500 to-rose-500",
    bgColor: "bg-red-50 dark:bg-red-900/30",
    borderColor: "border-red-400",
    textColor: "text-red-800 dark:text-red-200",
  },
  offline: {
    icon: WifiOff,
    gradient: "from-slate-500 to-slate-600",
    bgColor: "bg-slate-100 dark:bg-slate-800",
    borderColor: "border-slate-400",
    textColor: "text-slate-800 dark:text-slate-200",
  },
  geofence: {
    icon: Bus,
    gradient: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-900/30",
    borderColor: "border-violet-400",
    textColor: "text-violet-800 dark:text-violet-200",
  },
};

const AlertBanner = ({ type, title, message, timestamp, dismissible = true, onDismiss }: AlertBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const config = alertConfig[type];
  const Icon = config.icon;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl border animate-fade-in",
      config.bgColor,
      config.borderColor
    )}>
      {/* Animated Pulse Background for Critical Alerts */}
      {(type === "incident" || type === "delay") && (
        <div className="absolute inset-0 animate-pulse opacity-30">
          <div className={cn("w-full h-full bg-gradient-to-r", config.gradient)} />
        </div>
      )}

      <div className="relative p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br shadow-lg",
            config.gradient
          )}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className={cn("font-semibold", config.textColor)}>{title}</h4>
                <p className={cn("text-sm mt-0.5 opacity-80", config.textColor)}>{message}</p>
              </div>
              {dismissible && (
                <button
                  onClick={handleDismiss}
                  className={cn(
                    "p-1 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors",
                    config.textColor
                  )}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className={cn("text-xs mt-2 opacity-60", config.textColor)}>{timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;
