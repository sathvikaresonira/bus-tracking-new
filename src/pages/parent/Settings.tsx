import { useState } from "react";
import { Bell, MessageSquare, Smartphone, Clock, Shield, Moon, ChevronRight, ToggleLeft, ToggleRight, Volume2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const ParentSettings = () => {
  const [notifications, setNotifications] = useState({
    boarding: true,
    alighting: true,
    eta: true,
    delays: true,
    emergencies: true,
  });

  const [channels, setChannels] = useState({
    pushSms: true,
    email: false,
  });

  const [preferences, setPreferences] = useState({
    etaAdvance: 10,
    quietHoursEnabled: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
    darkMode: false,
    soundEnabled: true,
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your notification preferences
        </p>
      </div>

      {/* Notification Types */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center">
              <Bell className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">Alert Types</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Choose which alerts you receive</p>
            </div>
          </div>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {[
            { key: "boarding", label: "Boarding Alerts", description: "When your child boards the bus" },
            { key: "alighting", label: "Alighting Alerts", description: "When your child exits the bus" },
            { key: "eta", label: "ETA Notifications", description: "Bus arrival time updates" },
            { key: "delays", label: "Delay Alerts", description: "When the bus is running late" },
            { key: "emergencies", label: "Emergency Alerts", description: "Critical safety notifications" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-slate-800 dark:text-white">{item.label}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
              </div>
              <Switch
                checked={notifications[item.key as keyof typeof notifications]}
                onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Notification Channels */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">Notification Channels</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">How you want to be notified</p>
            </div>
          </div>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {[
            { key: "pushSms", label: "Push + SMS Notifications", icon: Smartphone, description: "In-app and text message alerts" },
            { key: "email", label: "Email Notifications", icon: MessageSquare, description: "Email updates" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">{item.label}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                </div>
              </div>
              <Switch
                checked={channels[item.key as keyof typeof channels]}
                onCheckedChange={(checked) => setChannels({ ...channels, [item.key]: checked })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ETA Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">ETA Alert Timing</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">When to receive arrival alerts</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            Notify me when the bus is <strong>{preferences.etaAdvance} minutes</strong> away
          </p>
          <div className="flex gap-2">
            {[5, 10, 15, 20].map((minutes) => (
              <button
                key={minutes}
                onClick={() => setPreferences({ ...preferences, etaAdvance: minutes })}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-medium transition-all",
                  preferences.etaAdvance === minutes
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-300/50"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}
              >
                {minutes} min
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <Moon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">Quiet Hours</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Mute non-urgent notifications</p>
            </div>
          </div>
          <Switch
            checked={preferences.quietHoursEnabled}
            onCheckedChange={(checked) => setPreferences({ ...preferences, quietHoursEnabled: checked })}
          />
        </div>
        {preferences.quietHoursEnabled && (
          <div className="p-4 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">From</span>
              <input
                type="time"
                value={preferences.quietHoursStart}
                onChange={(e) => setPreferences({ ...preferences, quietHoursStart: e.target.value })}
                className="bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">To</span>
              <input
                type="time"
                value={preferences.quietHoursEnd}
                onChange={(e) => setPreferences({ ...preferences, quietHoursEnd: e.target.value })}
                className="bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white"
              />
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Emergency alerts will still come through during quiet hours
            </p>
          </div>
        )}
      </div>

      {/* App Preferences */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-semibold text-slate-800 dark:text-white">App Preferences</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-slate-400" />
              <div>
                <p className="font-medium text-slate-800 dark:text-white">Sound Effects</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Play sounds for alerts</p>
              </div>
            </div>
            <Switch
              checked={preferences.soundEnabled}
              onCheckedChange={(checked) => setPreferences({ ...preferences, soundEnabled: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-slate-400" />
              <div>
                <p className="font-medium text-slate-800 dark:text-white">Dark Mode</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Use dark theme</p>
              </div>
            </div>
            <Switch
              checked={preferences.darkMode}
              onCheckedChange={(checked) => setPreferences({ ...preferences, darkMode: checked })}
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-4">
        <button className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-left">
              <p className="font-medium text-slate-800 dark:text-white">Security & Privacy</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Manage your account security</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>
      </div>
    </div>
  );
};

export default ParentSettings;
