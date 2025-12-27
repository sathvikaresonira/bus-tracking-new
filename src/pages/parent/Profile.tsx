import { useState } from "react";
import { User, CreditCard, Phone, Mail, MapPin, Bus, School, Edit2, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Profile = () => {
  const [activeChild, setActiveChild] = useState(0);

  // Mock data
  const parentData = {
    name: "John Johnson",
    email: "john.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Oak Street, Springfield, IL 62701",
  };

  const children = [
    {
      id: 1,
      name: "Sarah Johnson",
      class: "Grade 5 - Section A",
      school: "Lincoln High School",
      rfidStatus: "active",
      rfidNumber: "RFID-2024-0842",
      busNumber: "SB-042",
      route: "Route A - Oak Street",
      stopName: "Oak Street Stop #12",
    },
    {
      id: 2,
      name: "Tommy Johnson",
      class: "Grade 3 - Section B",
      school: "Lincoln Elementary",
      rfidStatus: "active",
      rfidNumber: "RFID-2024-0843",
      busNumber: "SB-015",
      route: "Route B - Maple Avenue",
      stopName: "Maple Avenue Stop #5",
    },
  ];

  const selectedChild = children[activeChild];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Parent Profile Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="relative h-24 bg-gradient-to-br from-sky-500 to-blue-600">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-3xl" />
          </div>
        </div>
        <div className="relative px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10">
            <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-700 shadow-xl flex items-center justify-center border-4 border-white dark:border-slate-800">
              <span className="text-3xl font-bold text-sky-600 dark:text-sky-400">
                {parentData.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 pb-2">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">{parentData.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Parent Account</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600 dark:text-slate-300">{parentData.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600 dark:text-slate-300">{parentData.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600 dark:text-slate-300">{parentData.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Children Selector */}
      <div>
        <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">My Children</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {children.map((child, index) => (
            <button
              key={child.id}
              onClick={() => setActiveChild(index)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl min-w-[200px] transition-all",
                activeChild === index
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-300/50"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                activeChild === index ? "bg-white/20" : "bg-slate-100 dark:bg-slate-700"
              )}>
                <span className={cn(
                  "text-lg font-bold",
                  activeChild === index ? "text-white" : "text-slate-600 dark:text-slate-300"
                )}>
                  {child.name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <p className={cn(
                  "font-medium text-sm",
                  activeChild === index ? "text-white" : "text-slate-800 dark:text-white"
                )}>
                  {child.name}
                </p>
                <p className={cn(
                  "text-xs",
                  activeChild === index ? "text-white/80" : "text-slate-500 dark:text-slate-400"
                )}>
                  {child.class}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Child Details */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-6 space-y-4">
          <h3 className="font-semibold text-slate-800 dark:text-white">Student Information</h3>
          
          {/* School Info */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center">
              <School className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="font-medium text-slate-800 dark:text-white">{selectedChild.school}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{selectedChild.class}</p>
            </div>
          </div>

          {/* Bus Info */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <Bus className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-800 dark:text-white">Bus {selectedChild.busNumber}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{selectedChild.route}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* Stop Info */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="font-medium text-slate-800 dark:text-white">{selectedChild.stopName}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Assigned Stop</p>
            </div>
          </div>
        </div>

        {/* RFID Card Status */}
        <div className="border-t border-slate-100 dark:border-slate-700 p-6">
          <h3 className="font-semibold text-slate-800 dark:text-white mb-4">RFID Card Status</h3>
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-300/50">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-emerald-800 dark:text-emerald-200">Card Active</p>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">{selectedChild.rfidNumber}</p>
            </div>
            <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-800 dark:text-white">Emergency Contacts</h3>
          <Button variant="ghost" size="sm" className="text-sky-600 dark:text-sky-400">
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center">
                <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-white">Primary Contact</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                <User className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-white">Secondary Contact</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">+1 (555) 987-6543</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
