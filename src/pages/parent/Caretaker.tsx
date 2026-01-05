import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Phone, Mail, Clock } from "lucide-react";

export default function ParentCaretaker() {
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
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Caretaker Details</h1>
                <p className="text-slate-500 dark:text-slate-400">Contact information for assigned caretakers</p>
            </div>

            <div className="grid gap-4">
                {caretakers.map((caretaker) => (
                    <Card key={caretaker.id} className="border-sky-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                            <div className="h-12 w-12 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                                <UserCheck className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                            </div>
                            <div className="flex-1">
                                <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">{caretaker.name}</CardTitle>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{caretaker.role}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${caretaker.status === 'On Duty'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                                }`}>
                                {caretaker.status}
                            </span>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <Phone className="h-4 w-4 text-slate-400" />
                                <span>{caretaker.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <Mail className="h-4 w-4 text-slate-400" />
                                <span>{caretaker.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <Clock className="h-4 w-4 text-slate-400" />
                                <span>{caretaker.shift}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
