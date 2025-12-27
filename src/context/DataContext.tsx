import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, Bus, Route, Alert, Driver, Stats } from '@/types';

interface DataContextType {
    students: Student[];
    buses: Bus[];
    routes: Route[];
    alerts: Alert[];
    drivers: Driver[];
    stats: Stats;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    addStudent: (student: Omit<Student, 'id'>) => string;
    updateStudent: (id: string, updates: Partial<Student>) => void;
    deleteStudent: (id: string) => void;
    restoreStudent: (student: Student) => void;
    addBus: (bus: Omit<Bus, 'id'>) => void;
    updateBus: (id: string, updates: Partial<Bus>) => void;
    deleteBus: (id: string) => void;
    addRoute: (route: Omit<Route, 'id'>) => void;
    updateRoute: (id: string, updates: Partial<Route>) => void;
    deleteRoute: (id: string) => void;
    addDriver: (driver: Omit<Driver, 'id'>) => void;
    updateDriver: (id: string, updates: Partial<Driver>) => void;
    deleteDriver: (id: string) => void;
    refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial Mock Data
const initialStudents: Student[] = [
    { id: "1", name: "John Smith", class: "Grade 5A", rfid: "RF001234", route: "Route A", parent: "Mary Smith", phone: "+1 234-567-8901", status: "active", state: "Telangana", mandal: "Hyderabad" },
    { id: "2", name: "Emma Wilson", class: "Grade 4B", rfid: "RF001235", route: "Route B", parent: "David Wilson", phone: "+1 234-567-8902", status: "active", state: "Telangana", mandal: "Secunderabad" },
    { id: "3", name: "Michael Brown", class: "Grade 6A", rfid: "RF001236", route: "Route A", parent: "Sarah Brown", phone: "+1 234-567-8903", status: "active", state: "Telangana", mandal: "Kukatpally" },
    { id: "4", name: "Sophia Davis", class: "Grade 3C", rfid: "RF001237", route: "Route C", parent: "James Davis", phone: "+1 234-567-8904", status: "inactive", state: "Telangana", mandal: "Ameerpet" },
    { id: "5", name: "William Johnson", class: "Grade 5A", rfid: "RF001238", route: "Route B", parent: "Lisa Johnson", phone: "+1 234-567-8905", status: "active", state: "Telangana", mandal: "Hitech City" },
];

const initialBuses: Bus[] = [
    { id: "101", busNumber: "Bus 101", driver: "Robert Johnson", route: "Route A", status: "on-route", passengers: 28, capacity: 40, currentStop: "Maple Street" },
    { id: "102", busNumber: "Bus 102", driver: "Sarah Williams", route: "Route B", status: "delayed", passengers: 35, capacity: 40, currentStop: "Oak Avenue" },
    { id: "103", busNumber: "Bus 103", driver: "Michael Davis", route: "Route C", status: "on-route", passengers: 22, capacity: 40, currentStop: "Pine Road" },
    { id: "104", busNumber: "Bus 104", driver: "Emily Brown", route: "Route D", status: "idle", passengers: 0, capacity: 40 },
];

const initialRoutes: Route[] = [
    { id: "A", name: "Route A", stops: ["Stop 1", "Stop 2", "School"], distance: "12km", estimatedTime: "45 mins" },
    { id: "B", name: "Route B", stops: ["Stop X", "Stop Y", "School"], distance: "8km", estimatedTime: "30 mins" },
];

const initialAlerts: Alert[] = [
    { id: "1", type: "delay", title: "Bus 102 Delayed", message: "Traffic on Route B", timestamp: "2024-03-10T08:30:00", time: "10m ago", status: "active", severity: "warning" },
    { id: "2", type: "geofence", title: "Route Deviation", message: "Bus 104 off route", timestamp: "2024-03-10T08:45:00", time: "5m ago", status: "active", severity: "error" },
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const DATA_VERSION = "v3"; // Increment version to clear stale data

    const getInitialData = <T,>(key: string, fallback: T): T => {
        const version = localStorage.getItem('data_version');
        if (version !== DATA_VERSION) {
            // New version detected, clear old state
            console.log("New data version detected. Resetting localStorage...");
            return fallback;
        }
        const stored = localStorage.getItem(key);
        try {
            return stored ? JSON.parse(stored) : fallback;
        } catch (e) {
            return fallback;
        }
    };

    const initialBusesWithLocations: Bus[] = [
        { id: "101", busNumber: "Bus 101", driver: "Robert Johnson", route: "Route A", status: "on-route", passengers: 28, capacity: 40, currentStop: "Maple Street", location: { lat: 17.3850, lng: 78.4867 }, speed: 45, isHarshDriving: false, isSOS: false, state: "Telangana", district: "Hyderabad", mandal: "Hyderabad" },
        { id: "102", busNumber: "Bus 102", driver: "Sarah Williams", route: "Route B", status: "delayed", passengers: 35, capacity: 40, currentStop: "Oak Avenue", location: { lat: 17.4000, lng: 78.4900 }, speed: 10, isHarshDriving: false, isSOS: false, state: "Telangana", district: "Hyderabad", mandal: "Secunderabad" },
        { id: "103", busNumber: "Bus 103", driver: "Michael Davis", route: "Route C", status: "on-route", passengers: 22, capacity: 40, currentStop: "Pine Road", location: { lat: 17.4200, lng: 78.4800 }, speed: 55, isHarshDriving: false, isSOS: false, state: "Telangana", district: "Medchal-Malkajgiri", mandal: "Kukatpally" },
        { id: "104", busNumber: "Bus 104", driver: "Emily Brown", route: "Route D", status: "idle", passengers: 0, capacity: 40, location: { lat: 17.4500, lng: 78.5000 }, speed: 0, isHarshDriving: false, isSOS: false, state: "Telangana", district: "Hyderabad", mandal: "Ameerpet" },
        { id: "105", busNumber: "Bus 105", driver: "David Smith", route: "Route E", status: "on-route", passengers: 30, capacity: 40, currentStop: "Main Road", location: { lat: 17.9689, lng: 79.5941 }, speed: 40, isHarshDriving: false, isSOS: false, state: "Telangana", district: "Warangal", mandal: "Hanamkonda" },
        { id: "106", busNumber: "Bus 106", driver: "James Wilson", route: "Route F", status: "on-route", passengers: 15, capacity: 40, currentStop: "Market Square", location: { lat: 18.4386, lng: 79.1288 }, speed: 50, isHarshDriving: false, isSOS: false, state: "Telangana", district: "Karimnagar", mandal: "Karimnagar" },
        { id: "107", busNumber: "Bus 107", driver: "Linda Garcia", route: "Route G", status: "on-route", passengers: 25, capacity: 40, currentStop: "Station Road", location: { lat: 15.9129, lng: 79.7400 }, speed: 45, isHarshDriving: false, isSOS: false, state: "Andhra Pradesh", district: "Guntur", mandal: "Guntur" },
        { id: "108", busNumber: "Bus 108", driver: "Kevin Lee", route: "Route H", status: "on-route", passengers: 10, capacity: 40, currentStop: "Beach Road", location: { lat: 17.6868, lng: 83.2185 }, speed: 35, isHarshDriving: false, isSOS: false, state: "Andhra Pradesh", district: "Visakhapatnam", mandal: "Visakhapatnam" },
    ];

    const [students, setStudents] = useState<Student[]>(() => getInitialData('students', initialStudents));
    const [buses, setBuses] = useState<Bus[]>(() => getInitialData('buses', initialBusesWithLocations));
    const [routes, setRoutes] = useState<Route[]>(() => getInitialData('routes', initialRoutes));
    const [alerts, setAlerts] = useState<Alert[]>(() => getInitialData('alerts', initialAlerts));
    const [drivers, setDrivers] = useState<Driver[]>(() => getInitialData('drivers', []));
    const [searchQuery, setSearchQuery] = useState("");

    // Update version on mount
    useEffect(() => {
        localStorage.setItem('data_version', DATA_VERSION);
    }, []);

    // Persistence Effects
    useEffect(() => localStorage.setItem('students', JSON.stringify(students)), [students]);
    useEffect(() => localStorage.setItem('buses', JSON.stringify(buses)), [buses]);
    useEffect(() => localStorage.setItem('routes', JSON.stringify(routes)), [routes]);
    useEffect(() => localStorage.setItem('alerts', JSON.stringify(alerts)), [alerts]);
    useEffect(() => localStorage.setItem('drivers', JSON.stringify(drivers)), [drivers]);

    // Simulation Effect
    useEffect(() => {
        const interval = setInterval(() => {
            setBuses(prevBuses => prevBuses.map(bus => {
                if (bus.status === 'idle' || bus.status === 'maintenance') return bus;

                // Simulate movement slightly
                const newLat = (bus.location?.lat || 17.3850) + (Math.random() - 0.5) * 0.001;
                const newLng = (bus.location?.lng || 78.4867) + (Math.random() - 0.5) * 0.001;

                // Simulate speed
                let newSpeed = Math.floor(Math.random() * 80); // 0-80 km/h
                const isOverSpeeding = newSpeed > 60;
                const isHarsh = Math.random() > 0.95; // 5% chance of harsh driving

                // Update Notification/Alerts if needed
                if (isOverSpeeding) {
                    // In a real app, we'd add to alerts list or trigger toast here
                    // For now just updating state for UI to reflect
                }

                return {
                    ...bus,
                    location: { lat: newLat, lng: newLng },
                    speed: newSpeed,
                    isHarshDriving: isHarsh,
                };
            }));
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

    // Stats derived from data
    const stats: Stats = {
        totalStudents: students.length,
        activeBuses: buses.filter(b => b.status === "on-route" || b.status === "delayed").length,
        todaysScans: 847, // Mocked for now
        notificationsSent: 1694 // Mocked
    };

    const uuid = () => Math.random().toString(36).substr(2, 9);

    const addStudent = (student: Omit<Student, 'id'>) => {
        const id = uuid();
        setStudents(prev => [...prev, { ...student, id }]);
        return id;
    };

    const updateStudent = (id: string, updates: Partial<Student>) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const deleteStudent = (id: string) => {
        setStudents(prev => prev.filter(s => s.id !== id));
    };

    const restoreStudent = (student: Student) => {
        setStudents(prev => [...prev, student]);
    };

    const addBus = (bus: Omit<Bus, 'id'>) => {
        setBuses(prev => [...prev, { ...bus, id: uuid() }]);
    };

    const updateBus = (id: string, updates: Partial<Bus>) => {
        setBuses(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
    };

    const deleteBus = (id: string) => {
        setBuses(prev => prev.filter(b => b.id !== id));
    };

    const addRoute = (route: Omit<Route, 'id'>) => {
        setRoutes(prev => [...prev, { ...route, id: uuid() }]);
    };

    const updateRoute = (id: string, updates: Partial<Route>) => {
        setRoutes(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    };

    const deleteRoute = (id: string) => {
        setRoutes(prev => prev.filter(r => r.id !== id));
    };

    // Driver logic
    const addDriver = (driver: Omit<Driver, "id">) => {
        setDrivers(prev => [...prev, { ...driver, id: uuid(), status: 'active' }]);
    };

    const updateDriver = (id: string, updates: Partial<Driver>) => {
        setDrivers(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
    };

    const deleteDriver = (id: string) => {
        setDrivers(prev => prev.filter(d => d.id !== id));
    };

    const refreshData = () => {
        // Force reset all data to initial state and clear storage
        console.log("Resetting all application data...");
        localStorage.clear();
        setBuses(initialBusesWithLocations);
        setStudents(initialStudents);
        setRoutes(initialRoutes);
        setDrivers([]);
        setAlerts(initialAlerts);
        localStorage.setItem('data_version', DATA_VERSION);
        window.location.reload(); // Ensure everything is fresh
    };

    return (
        <DataContext.Provider value={{
            students, buses, routes, alerts, drivers, stats,
            searchQuery, setSearchQuery,
            addStudent, updateStudent, deleteStudent, restoreStudent,
            addBus, updateBus, deleteBus,
            addRoute, updateRoute, deleteRoute,
            addDriver, updateDriver, deleteDriver,
            refreshData
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
