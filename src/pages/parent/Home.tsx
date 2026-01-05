import StatusCard from "@/components/parent/StatusCard";
import ETACard from "@/components/parent/ETACard";
import AlertBanner from "@/components/parent/AlertBanner";
import QuickActionButton from "@/components/parent/QuickActionButton";
import BoardingEventCard from "@/components/parent/BoardingEventCard";
import { Phone, MapPin, Bell, History, Bus, Home, School } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LiveMap from "@/components/common/Map";
import { useData } from "@/context/DataContext";

const ParentHome = () => {
  const navigate = useNavigate();
  const { buses } = useData();
  const myBus = buses.find(b => b.id === "101") || buses[0];

  // Mock data - would come from API
  const studentData = {
    name: "Sarah Johnson",
    class: "Grade 5 - Section A",
    status: "on-bus-to-school" as const,
    busNumber: "SB-042",
    lastUpdate: "2 mins ago",
  };

  const etaData = {
    minutes: 8,
    stopName: "Oak Street Stop #12",
    distance: "1.2 km",
  };

  const hasActiveAlert = true;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Active Alert */}
      {hasActiveAlert && (
        <AlertBanner
          type="delay"
          title="Bus Running Late"
          message="Bus SB-042 is delayed by approximately 5 minutes due to traffic."
          timestamp="Today, 7:32 AM"
        />
      )}

      {/* Student Status Card */}
      <StatusCard
        studentName={studentData.name}
        studentClass={studentData.class}
        status={studentData.status}
        busNumber={studentData.busNumber}
        lastUpdate={studentData.lastUpdate}
      />


      {/* ETA Card - Only show when on bus */}
      {(studentData.status === "on-bus-to-school" || studentData.status === "on-bus-to-home") && (
        <ETACard
          etaMinutes={etaData.minutes}
          stopName={etaData.stopName}
          distance={etaData.distance}
        />
      )}

      {/* Live Map Preview */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            Live Location
          </h3>
          <span className="text-xs font-medium px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full animate-pulse">
            Live
          </span>
        </div>
        <div className="relative h-48 bg-slate-100 dark:bg-slate-900 w-full overflow-hidden">
          <LiveMap
            buses={buses}
            center={myBus.location ? { lat: myBus.location.lat, lng: myBus.location.lng } : undefined}
            zoom={14}
          />
        </div>
        <button
          onClick={() => navigate("/parent/track")}
          className="w-full py-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          View Full Map
        </button>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-3">
          <QuickActionButton
            icon={MapPin}
            label="Live Map"
            variant="primary"
            onClick={() => navigate("/parent/track")}
          />
          <QuickActionButton
            icon={History}
            label="History"
            variant="secondary"
            onClick={() => navigate("/parent/notifications")}
          />
          <QuickActionButton
            icon={Phone}
            label="Contact"
            variant="success"
            onClick={() => navigate("/parent/contact")}
          />
        </div>
      </div>

      {/* Today's Events */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300">Today's Events</h3>
          <button
            onClick={() => navigate("/parent/notifications")}
            className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          <BoardingEventCard
            tripType="to-school"
            eventType="boarding"
            timestamp="7:15 AM"
            location="Oak Street Stop #12"
            coordinates="40.7128° N, 74.0060° W"
            busNumber="SB-042"
          />
        </div>
      </div>

      {/* Safety Tip */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center">
            <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h4 className="font-medium text-emerald-800 dark:text-emerald-200">Stay Informed</h4>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">
              Enable push notifications to receive real-time boarding alerts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentHome;
