import { useNavigate } from "react-router-dom";
import { Bus, User, Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LoginSelection = () => {
    const navigate = useNavigate();

    const handleRoleSelect = (role: string) => {
        navigate(`/login/${role}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12 space-y-4">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                            <Bus className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Welcome to BusTrack</h1>
                    <p className="text-xl text-muted-foreground">Please select your role to continue</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Driver Portal */}
                    <Card
                        className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
                        onClick={() => handleRoleSelect('driver')}
                    >
                        <CardContent className="p-8 text-center space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-semibold">Driver</h2>
                            <p className="text-muted-foreground">Access route information and manage trips</p>
                            <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary group-hover:text-white">
                                Login as Driver
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Parent Portal */}
                    <Card
                        className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
                        onClick={() => handleRoleSelect('parent')}
                    >
                        <CardContent className="p-8 text-center space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-2xl font-semibold">Parent</h2>
                            <p className="text-muted-foreground">Track your child's bus and receive updates</p>
                            <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary group-hover:text-white">
                                Login as Parent
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Admin Portal */}
                    <Card
                        className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
                        onClick={() => handleRoleSelect('admin')}
                    >
                        <CardContent className="p-8 text-center space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-2xl font-semibold">Admin</h2>
                            <p className="text-muted-foreground">Manage system, users, and fleet</p>
                            <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary group-hover:text-white">
                                Login as Admin
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginSelection;
