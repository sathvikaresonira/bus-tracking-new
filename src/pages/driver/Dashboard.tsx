import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bus, MapPin, Phone, CreditCard, Shield, Star, Calendar, FileText, X, Home } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function DriverDashboard() {
    const navigate = useNavigate();
    // Simulating logged-in driver - for demo, picking "Robert Johnson" associated with Bus 101 from DataContext
    // In real app, this would come from Auth Context
    const { buses } = useData();
    const myBus = buses.find(b => b.id === "101") || buses[0];
    const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

    const driverDetails = {
        name: myBus?.driver || "Robert Johnson",
        id: "DRV-2024-042",
        license: "DL-TX-98765432",
        phone: "+1 (555) 123-4567",
        joinedDate: "Mar 15, 2021",
        rating: 4.8,
        totalTrips: 1240,
        status: "Active",
        address: "123 Main St, Hyderabad",
        bloodGroup: "O+"
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold">Driver Profile</h1>
                <p className="text-muted-foreground">Manage your personal details and vehicle info</p>
            </div>

            {/* Driver Identity Card */}
            <Card className="overflow-hidden border-2 border-primary/10">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                    <div className="absolute -bottom-16 left-8 p-1 bg-white dark:bg-slate-900 rounded-full">
                        <Avatar className="w-32 h-32 border-4 border-white dark:border-slate-900 shadow-xl">
                            <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop" className="object-cover" />
                            <AvatarFallback>DR</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <CardContent className="pt-20 px-8 pb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                {driverDetails.name}
                                <Shield className="w-6 h-6 text-blue-500 fill-blue-500" />
                            </h2>
                            <p className="text-lg text-muted-foreground font-medium">Senior Driver • {driverDetails.id}</p>
                        </div>
                        <Badge className="px-4 py-1.5 text-sm bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                            ● {driverDetails.status}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                            <span className="text-sm text-slate-500 dark:text-slate-400">License Number</span>
                            <div className="flex items-center gap-2 font-semibold text-lg">
                                <CreditCard className="w-5 h-5 text-primary" />
                                {driverDetails.license}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 ml-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                    onClick={() => setIsLicenseModalOpen(true)}
                                    title="View License"
                                >
                                    <FileText className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Contact Phone</span>
                            <div className="flex items-center gap-2 font-semibold text-lg">
                                <Phone className="w-5 h-5 text-primary" />
                                {driverDetails.phone}
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Performance</span>
                            <div className="flex items-center gap-2 font-semibold text-lg">
                                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                                {driverDetails.rating} / 5.0
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Address</span>
                            <div className="flex items-center gap-2 font-semibold text-lg">
                                <Home className="w-5 h-5 text-primary" />
                                {driverDetails.address}
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Blood Group</span>
                            <div className="flex items-center gap-2 font-semibold text-lg">
                                {driverDetails.bloodGroup}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Assigned Vehicle */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bus className="w-5 h-5 text-primary" />
                            Assigned Vehicle
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <span className="text-muted-foreground">Bus Number</span>
                            <span className="font-bold text-lg">{myBus?.busNumber}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <span className="text-muted-foreground">Registration No.</span>
                            <span className="font-medium">{myBus?.plate || "N/A"}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <span className="text-muted-foreground">Capacity</span>
                            <span className="font-medium">{myBus?.capacity} Seats</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <span className="text-muted-foreground">Status</span>
                            <Badge variant="outline" className="uppercase">{myBus?.status}</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Current Route */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            Assigned Route
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <span className="text-muted-foreground">Route ID</span>
                            <span className="font-bold text-lg">{myBus?.route}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <span className="text-muted-foreground">Start Location</span>
                            <span className="font-medium">Town Center</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <span className="text-muted-foreground">Destination</span>
                            <span className="font-medium">Lincoln High School</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Next Scheduled Trip</h3>
                        <p className="text-muted-foreground">Tomorrow, 7:00 AM • Route A Morning Pickup</p>
                    </div>
                    <Button className="ml-auto" onClick={() => navigate("/driver/route")}>View Schedule</Button>
                </CardContent>
            </Card>


            {/* License Photo Dialog */}
            <Dialog open={isLicenseModalOpen} onOpenChange={setIsLicenseModalOpen}>
                <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-transparent border-0 shadow-none">
                    <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-2xl overflow-hidden">
                        <div className="absolute top-2 right-2 z-10">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white"
                                onClick={() => setIsLicenseModalOpen(false)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="p-1">
                            <img
                                src="/driver_license_sample.png"
                                alt="Driver License"
                                className="w-full h-auto rounded-md object-contain"
                            />
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-900">
                            <h3 className="font-bold text-lg text-center">Driver License</h3>
                            <p className="text-muted-foreground text-center text-sm">{driverDetails.license}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
