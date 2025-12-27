import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Home, Bell, User, Settings, Bus, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const ParentLayout = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/parent" },
    { icon: Bus, label: "Track", path: "/parent/track" },
    { icon: Bell, label: "Alerts", path: "/parent/notifications" },
    { icon: User, label: "Profile", path: "/parent/profile" },
    { icon: Phone, label: "Contact", path: "/parent/contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-sky-100 dark:border-slate-700 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200/50">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 dark:text-white">SchoolBus</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Track & Stay Safe</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-full hover:bg-sky-100 dark:hover:bg-slate-800 transition-colors">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 pb-24 max-w-lg mx-auto w-full">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-sky-100 dark:border-slate-700 px-2 py-2 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-300/50"
                    : "text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-slate-800"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default ParentLayout;
