import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, AlertTriangle, Info, CheckCircle } from "lucide-react";

export default function DriverNotifications() {
    const notifications = [
        {
            id: 1,
            type: "alert",
            title: "Heavy Traffic Reported",
            message: "Congestion reported on Main St. Consider alternate route.",
            time: "10 mins ago",
            read: false
        },
        {
            id: 2,
            type: "info",
            title: "Schedule Update",
            message: "Maintenance scheduled for Bus 101 tomorrow at 2 PM.",
            time: "2 hours ago",
            read: true
        },
        {
            id: 3,
            type: "success",
            title: "Trip Completed",
            message: "Morning route completed successfully. On-time arrival recorded.",
            time: "5 hours ago",
            read: true
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold">Notifications</h1>
                <p className="text-muted-foreground">Stay updated with latest alerts and announcements</p>
            </div>

            <div className="space-y-4">
                {notifications.map((notification) => (
                    <Card key={notification.id} className={`transition-all hover:bg-slate-50 dark:hover:bg-slate-800 ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
                        <CardContent className="p-4 flex gap-4">
                            <div className={`p-3 rounded-full h-fit flex-shrink-0 ${notification.type === 'alert' ? 'bg-red-100 text-red-600' :
                                notification.type === 'success' ? 'bg-green-100 text-green-600' :
                                    'bg-blue-100 text-blue-600'
                                }`}>
                                {notification.type === 'alert' ? <AlertTriangle className="w-5 h-5" /> :
                                    notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
                                        <Info className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className={`font-semibold ${!notification.read ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                        {notification.title}
                                    </h3>
                                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
