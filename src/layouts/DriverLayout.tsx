import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Bus, User, LogOut, MapPin, Bell, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

export default function DriverLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { icon: User, label: "My Profile", path: "/driver" },
        { icon: MapPin, label: "My Route", path: "/driver/route" },
        { icon: Bell, label: "Notifications", path: "/driver/notifications" },
        { icon: Users, label: "Caretaker", path: "/driver/caretaker" },
    ];

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white dark:bg-slate-800 p-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Bus className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg">BusTrack</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex h-screen overflow-hidden">
                {/* Sidebar for Desktop */}
                <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                            <Bus className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-xl">BusTrack Driver</span>
                    </div>

                    <nav className="flex-1 px-4 space-y-2 mt-4">
                        {menuItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                                    location.pathname === item.path
                                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium"
                        >
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-24 lg:pb-8">
                    <div className="max-w-4xl mx-auto">
                        <Outlet />
                    </div>
                </main>

                {/* Bottom Nav for Mobile */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-2 z-50">
                    <div className="flex justify-around items-center">
                        {menuItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={cn(
                                    "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                                    location.pathname === item.path
                                        ? "text-primary"
                                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                )}
                            >
                                <item.icon className={cn("w-6 h-6", location.pathname === item.path && "fill-current")} />
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
}
