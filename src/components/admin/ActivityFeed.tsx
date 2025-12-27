import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "boarding" | "departure" | "arrival" | "alert";
  message: string;
  time: string;
  student?: string;
  bus?: string;
}

const activities: Activity[] = [
  { id: "1", type: "boarding", message: "John Smith boarded", time: "2 min ago", student: "John Smith", bus: "Bus 101" },
  { id: "2", type: "departure", message: "Bus 103 departed from school", time: "5 min ago", bus: "Bus 103" },
  { id: "3", type: "alert", message: "Bus 102 delayed by 10 mins", time: "8 min ago", bus: "Bus 102" },
  { id: "4", type: "arrival", message: "Bus 105 arrived at Stop 12", time: "12 min ago", bus: "Bus 105" },
  { id: "5", type: "boarding", message: "Emma Wilson boarded", time: "15 min ago", student: "Emma Wilson", bus: "Bus 101" },
  { id: "6", type: "boarding", message: "Michael Brown boarded", time: "18 min ago", student: "Michael Brown", bus: "Bus 104" },
];

const typeStyles = {
  boarding: { bg: "bg-success/10", text: "text-success", label: "Boarding" },
  departure: { bg: "bg-primary/10", text: "text-primary", label: "Departure" },
  arrival: { bg: "bg-secondary/10", text: "text-secondary", label: "Arrival" },
  alert: { bg: "bg-warning/10", text: "text-warning", label: "Alert" },
};

export function ActivityFeed() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Live Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
            <div className={cn("w-2 h-2 rounded-full mt-2", typeStyles[activity.type].bg.replace('/10', ''))} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{activity.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className={cn("text-xs", typeStyles[activity.type].bg, typeStyles[activity.type].text)}>
                  {typeStyles[activity.type].label}
                </Badge>
                {activity.bus && (
                  <span className="text-xs text-muted-foreground">{activity.bus}</span>
                )}
              </div>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
