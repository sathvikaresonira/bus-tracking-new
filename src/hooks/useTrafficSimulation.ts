import { useEffect } from 'react';
import { Bus } from '@/types';

export const useTrafficSimulation = (
    setBuses: React.Dispatch<React.SetStateAction<Bus[]>>
) => {
    useEffect(() => {
        const interval = setInterval(() => {
            setBuses(prevBuses => prevBuses.map(bus => {
                if (bus.status === 'idle' || bus.status === 'maintenance') return bus;

                // Simulate movement slightly
                const newLat = (bus.location?.lat || 17.3850) + (Math.random() - 0.5) * 0.001;
                const newLng = (bus.location?.lng || 78.4867) + (Math.random() - 0.5) * 0.001;

                // Simulate speed
                let newSpeed = Math.floor(Math.random() * 80); // 0-80 km/h

                return {
                    ...bus,
                    location: { lat: newLat, lng: newLng },
                    speed: newSpeed,
                };
            }));
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, [setBuses]);
};
