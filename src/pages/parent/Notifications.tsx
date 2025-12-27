import { useState } from "react";
import BoardingEventCard from "@/components/parent/BoardingEventCard";
import { Calendar, Filter, ChevronDown, School, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Notifications = () => {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "to-school" | "to-home">("all");
  const [selectedDate, setSelectedDate] = useState("today");

  // Mock notification data
  const notifications = [
    {
      id: 1,
      date: "Today",
      events: [
        {
          tripType: "to-school" as const,
          eventType: "alighting" as const,
          timestamp: "7:38 AM",
          location: "Lincoln High School - Main Gate",
          coordinates: "40.7148° N, 74.0068° W",
          busNumber: "SB-042",
        },
        {
          tripType: "to-school" as const,
          eventType: "boarding" as const,
          timestamp: "7:15 AM",
          location: "Oak Street Stop #12",
          coordinates: "40.7128° N, 74.0060° W",
          busNumber: "SB-042",
        },
      ],
    },
    {
      id: 2,
      date: "Yesterday",
      events: [
        {
          tripType: "to-home" as const,
          eventType: "alighting" as const,
          timestamp: "3:52 PM",
          location: "Oak Street Stop #12",
          coordinates: "40.7128° N, 74.0060° W",
          busNumber: "SB-042",
        },
        {
          tripType: "to-home" as const,
          eventType: "boarding" as const,
          timestamp: "3:30 PM",
          location: "Lincoln High School - Main Gate",
          coordinates: "40.7148° N, 74.0068° W",
          busNumber: "SB-042",
          isDelayed: true,
          delayMinutes: 10,
        },
        {
          tripType: "to-school" as const,
          eventType: "alighting" as const,
          timestamp: "7:35 AM",
          location: "Lincoln High School - Main Gate",
          coordinates: "40.7148° N, 74.0068° W",
          busNumber: "SB-042",
        },
        {
          tripType: "to-school" as const,
          eventType: "boarding" as const,
          timestamp: "7:12 AM",
          location: "Oak Street Stop #12",
          coordinates: "40.7128° N, 74.0060° W",
          busNumber: "SB-042",
        },
      ],
    },
  ];

  const filterOptions = [
    { value: "all", label: "All Events", icon: null },
    { value: "to-school", label: "To School", icon: School },
    { value: "to-home", label: "Return Home", icon: Home },
  ];

  const dateOptions = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
  ];

  // Filter notifications based on selection
  const filteredNotifications = notifications.map((day) => ({
    ...day,
    events: day.events.filter((event) => {
      if (selectedFilter === "all") return true;
      return event.tripType === selectedFilter;
    }),
  })).filter((day) => day.events.length > 0);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Notification History</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Track all boarding and alighting events
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3">
        {/* Trip Type Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedFilter(option.value as "all" | "to-school" | "to-home")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                selectedFilter === option.value
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-300/50"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              )}
            >
              {option.icon && <option.icon className="w-4 h-4" />}
              {option.label}
            </button>
          ))}
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 pr-10 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {dateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {filteredNotifications.map((day) => (
          <div key={day.id}>
            {/* Date Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">{day.date}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {day.events.length} events
                </p>
              </div>
            </div>

            {/* Events */}
            <div className="space-y-3 ml-5 pl-5 border-l-2 border-slate-200 dark:border-slate-700">
              {day.events.map((event, index) => (
                <BoardingEventCard key={index} {...event} />
              ))}
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Filter className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 dark:text-slate-300 font-medium">No events found</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
