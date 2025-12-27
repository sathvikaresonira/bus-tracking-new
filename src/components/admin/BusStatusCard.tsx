import { Bus, Users, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BusStatusCardProps {
  busNumber: string;
  driver: string;
  route: string;
  status: "on-route" | "idle" | "delayed" | "completed" | "maintenance";
  passengers: number;
  capacity: number;
  currentStop?: string;
}

const statusStyles = {
  "on-route": { bg: "bg-success", text: "On Route" },
  "idle": { bg: "bg-muted-foreground", text: "Idle" },
  "delayed": { bg: "bg-warning", text: "Delayed" },
  "completed": { bg: "bg-primary", text: "Completed" },
  "maintenance": { bg: "bg-destructive", text: "Maintenance" },
};

export function BusStatusCard({
  busNumber,
  driver,
  route,
  status,
  passengers,
  capacity,
  currentStop,
}: BusStatusCardProps) {
  const occupancyPercent = Math.round((passengers / capacity) * 100);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{busNumber}</h3>
              <p className="text-xs text-muted-foreground">{driver}</p>
            </div>
          </div>
          <Badge className={cn("text-xs text-white", statusStyles[status].bg)}>
            {statusStyles[status].text}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Route:</span>
            <span className="font-medium">{route}</span>
          </div>

          {currentStop && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              </div>
              <span className="text-muted-foreground">At:</span>
              <span className="font-medium">{currentStop}</span>
            </div>
          )}

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Passengers</span>
              </div>
              <span className="font-medium">{passengers}/{capacity}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  occupancyPercent > 90 ? "bg-destructive" : occupancyPercent > 70 ? "bg-warning" : "bg-success"
                )}
                style={{ width: `${occupancyPercent}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
