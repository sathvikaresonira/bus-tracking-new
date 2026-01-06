import { ChevronRight, Edit, MoreVertical, Trash2, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RouteCardProps {
    route: any;
    assignedBus: any;
    onView: () => void;
    onEdit: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
}

const RouteCard = ({ route, assignedBus, onView, onEdit, onDelete }: RouteCardProps) => {
    return (
        <Card
            className="animate-fade-in hover:shadow-lg transition-all cursor-pointer group hover:border-blue-500 hover:ring-1 hover:ring-blue-500/50"
            onClick={onView}
        >
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                        {route.name}
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}><MoreVertical className="w-4 h-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2" onClick={onEdit}><Edit className="w-4 h-4" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={onDelete}><Trash2 className="w-4 h-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Stops</span>
                    <span className="font-medium">{route.stops.length || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Distance</span>
                    <span className="font-medium">{route.distance}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Est. Time</span>
                    <span className="font-medium">{route.estimatedTime}</span>
                </div>
            </CardContent>
            <div className="px-6 pb-4 pt-0">
                <div className="pt-3 border-t flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Bus className="w-4 h-4 text-primary" />
                            {assignedBus ? (
                                <div className="flex flex-col">
                                    <span>{assignedBus.busNumber}</span>
                                    <span className="text-[10px] text-muted-foreground">{assignedBus.plate}</span>
                                </div>
                            ) : <span className="text-muted-foreground">No Bus Assigned</span>}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default RouteCard;
