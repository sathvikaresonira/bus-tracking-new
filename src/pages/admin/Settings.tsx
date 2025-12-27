import { Save, Bell, Shield, Clock, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage system configuration and preferences</p>
      </div>

      {/* Notification Settings */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <CardTitle>Notification Settings</CardTitle>
          </div>
          <CardDescription>Configure how and when notifications are sent to parents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Boarding Notifications</Label>
              <p className="text-sm text-muted-foreground">Send alert when student boards the bus</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Alighting Notifications</Label>
              <p className="text-sm text-muted-foreground">Send alert when student exits the bus</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>ETA Notifications</Label>
              <p className="text-sm text-muted-foreground">Send alert when bus is approaching stop</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Delay Alerts</Label>
              <p className="text-sm text-muted-foreground">Notify parents when bus is delayed</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Default Notification Channel</Label>
            <Select defaultValue="both">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sms">SMS Only</SelectItem>
                <SelectItem value="push">Push Only</SelectItem>
                <SelectItem value="both">SMS + Push</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Geofencing Settings */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-secondary" />
            <CardTitle>Geofencing & Safety</CardTitle>
          </div>
          <CardDescription>Configure geofencing alerts and safety parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Geofencing</Label>
              <p className="text-sm text-muted-foreground">Alert when bus deviates from route</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Geofence Radius (meters)</Label>
              <Input type="number" defaultValue="200" />
            </div>
            <div className="space-y-2">
              <Label>Speed Limit Alert (km/h)</Label>
              <Input type="number" defaultValue="60" />
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Emergency SOS Alert</Label>
              <p className="text-sm text-muted-foreground">Enable emergency button for drivers</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Schedule Settings */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-success" />
            <CardTitle>Schedule Settings</CardTitle>
          </div>
          <CardDescription>Configure default operating hours and schedules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Morning Pickup Start</Label>
              <Input type="time" defaultValue="06:30" />
            </div>
            <div className="space-y-2">
              <Label>Morning Pickup End</Label>
              <Input type="time" defaultValue="08:30" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Afternoon Drop Start</Label>
              <Input type="time" defaultValue="14:30" />
            </div>
            <div className="space-y-2">
              <Label>Afternoon Drop End</Label>
              <Input type="time" defaultValue="17:00" />
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>ETA Notification Advance (minutes)</Label>
            <Select defaultValue="5">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 minutes</SelectItem>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* SMS Settings */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-warning" />
            <CardTitle>SMS Gateway</CardTitle>
          </div>
          <CardDescription>Configure SMS gateway for notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>SMS Provider</Label>
            <Select defaultValue="twilio">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="twilio">Twilio</SelectItem>
                <SelectItem value="nexmo">Nexmo</SelectItem>
                <SelectItem value="aws">AWS SNS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>API Key</Label>
              <Input type="password" placeholder="Enter API key" />
            </div>
            <div className="space-y-2">
              <Label>API Secret</Label>
              <Input type="password" placeholder="Enter API secret" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Sender ID</Label>
            <Input placeholder="BusTrack" defaultValue="BusTrack" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="gap-2" onClick={() => toast.success("Settings saved successfully")}>
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
