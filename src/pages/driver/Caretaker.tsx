import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Phone, Mail, Clock } from "lucide-react";

export default function DriverCaretaker() {
    // Mock data for caretakers
    const caretakers = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Morning Shift Caretaker",
            phone: "+91 98765 43210",
            email: "sarah.j@school.com",
            shift: "6:00 AM - 2:00 PM",
            status: "On Duty"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Evening Shift Caretaker",
            phone: "+91 98765 43211",
            email: "michael.c@school.com",
            shift: "1:00 PM - 9:00 PM",
            status: "Off Duty"
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold">Caretaker Details</h1>
                <p className="text-muted-foreground">Contact information for assigned caretakers</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {caretakers.map((caretaker) => (
                    <Card key={caretaker.id} className="transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <UserCheck className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-semibold">{caretaker.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{caretaker.role}</p>
                            </div>
                            <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${caretaker.status === 'On Duty'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                                }`}>
                                {caretaker.status}
                            </span>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{caretaker.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{caretaker.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{caretaker.shift}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
