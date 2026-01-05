export interface Student {
    id: string;
    name: string;
    class: string;
    rfid: string;
    route: string;
    parent: string;
    phone: string;
    state?: string;
    mandal?: string;
    district?: string;
    country?: string;
    status: "active" | "inactive";
    boardingStatus?: "boarded" | "not-boarded";
    rollNumber?: string;
    bloodGroup?: string;
    address?: string;
    profileImage?: string;
    dob?: string;
    emergencyContact?: string;
    assignedBus?: string;
}

export interface Bus {
    id: string;
    busNumber: string;
    driver: string;
    route: string;
    status: "on-route" | "delayed" | "idle" | "maintenance" | "completed";
    passengers: number;
    capacity: number;
    currentStop?: string;
    location?: { lat: number; lng: number };
    speed?: number;
    isSOS?: boolean;
    state?: string;
    mandal?: string;
    district?: string;
    plate?: string;
}

export interface Route {
    id: string;
    name: string;
    stops: string[];
    distance: string;
    estimatedTime: string;
    assignedBus?: string;
}

export interface Alert {
    id: string;
    type: "delay" | "incident" | "offline" | "geofence" | "notification" | "maintenance";
    title: string;
    message: string;
    timestamp: string;
    time?: string; // Backwards compatibility or optional display time
    status: "active" | "resolved";
    severity: "error" | "warning" | "info";
}

export interface Driver {
    id: string;
    name: string;
    license: string;
    phone: string;
    status: "active" | "on-leave";
    assignedBus?: string;
    joinDate?: string;
    experience?: number;
    rating?: number;
    address?: string;
    profileImage?: string;
    workHistory?: string;
    bloodGroup?: string;
    emergencyContact?: string;
}

export interface Stats {
    totalStudents: number;
    activeBuses: number;
    todaysScans: number;
    notificationsSent: number;
    morningBoarded: number;
    eveningReturns: number;
}

export interface Caretaker {
    id: string;
    name: string;
    phone: string;
    status: "active" | "on-leave";
    assignedBus?: string;
    joinDate?: string;
    experience?: number;
    address?: string;
    profileImage?: string;
    bloodGroup?: string;
    emergencyContact?: string;
}
