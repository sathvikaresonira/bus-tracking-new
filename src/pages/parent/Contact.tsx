import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

export default function ParentContact() {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (!message.trim()) {
            toast.error("Please enter a message");
            return;
        }
        toast.success("Message sent to transport admin");
        setMessage("");
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Contact & Support</h1>
                <p className="text-slate-500 dark:text-slate-400">Get in touch with the transport department</p>
            </div>

            <div className="grid gap-6">
                {/* Quick Contact Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-100 dark:border-emerald-800">
                        <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                                <Phone className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-emerald-900 dark:text-emerald-100">Transport Hotline</p>
                                <p className="text-sm text-emerald-700 dark:text-emerald-300">+1 (555) 000-1234</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800">
                        <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                                <Mail className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-blue-900 dark:text-blue-100">Email Support</p>
                                <p className="text-sm text-blue-700 dark:text-blue-300">transport@school.edu</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Message Form */}
                <Card className="border-sky-100 dark:border-slate-700 shadow-xl shadow-sky-100/50 dark:shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-primary" />
                            Send a Message
                        </CardTitle>
                        <CardDescription>
                            Have a specific concern about your child's route or bus?
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Urgency Level</Label>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium cursor-pointer hover:bg-slate-200">General Inquiry</span>
                                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium cursor-pointer hover:bg-slate-200">Absence</span>
                                <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 text-xs font-medium cursor-pointer hover:bg-red-200">Incident Report</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Your Message</Label>
                            <Textarea
                                id="message"
                                placeholder="Type your message here..."
                                className="min-h-[120px] resize-none"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full gap-2" size="lg" onClick={handleSendMessage}>
                            <Send className="w-4 h-4" />
                            Send Message
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
