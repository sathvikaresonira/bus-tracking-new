export interface GeoLocation {
    lat: number;
    lng: number;
    zoom: number;
}

export const stateCoordinates: Record<string, GeoLocation> = {
    "Telangana": { lat: 18.1124, lng: 79.0193, zoom: 7.5 },
    "Andhra Pradesh": { lat: 15.9129, lng: 79.7400, zoom: 7 },
    "Karnataka": { lat: 15.3173, lng: 75.7139, zoom: 7 },
    "Maharashtra": { lat: 19.7515, lng: 75.7139, zoom: 7 },
    "Tamil Nadu": { lat: 11.1271, lng: 78.6569, zoom: 7 },
};

export const districtCoordinates: Record<string, GeoLocation> = {
    // Telangana Districts
    "Hyderabad": { lat: 17.3850, lng: 78.4867, zoom: 12 },
    "Medchal-Malkajgiri": { lat: 17.5300, lng: 78.4800, zoom: 11 },
    "Rangareddy": { lat: 17.2000, lng: 78.3000, zoom: 10 },
    "Warangal": { lat: 17.9689, lng: 79.5941, zoom: 11 },
    "Karimnagar": { lat: 18.4386, lng: 79.1288, zoom: 11 },
    "Nizamabad": { lat: 18.6725, lng: 78.0941, zoom: 11 },
    "Khammam": { lat: 17.2473, lng: 80.1514, zoom: 11 },
    "Mahabubnagar": { lat: 16.7367, lng: 77.9819, zoom: 11 },
    "Nalgonda": { lat: 17.0500, lng: 79.2700, zoom: 11 },
    "Sangareddy": { lat: 17.6100, lng: 78.0800, zoom: 11 },
    "Siddipet": { lat: 18.1000, lng: 78.8500, zoom: 11 },
    "Suryapet": { lat: 17.1300, lng: 79.6200, zoom: 11 },
    "Vikarabad": { lat: 17.3300, lng: 77.9000, zoom: 11 },
    "Yadadri Bhuvanagiri": { lat: 17.5100, lng: 78.8900, zoom: 11 },
    "Adilabad": { lat: 19.6600, lng: 78.5300, zoom: 11 },
    "Jagatial": { lat: 18.8000, lng: 78.9300, zoom: 11 },
    "Jangaon": { lat: 17.7200, lng: 79.1600, zoom: 11 },
    "Kamareddy": { lat: 18.3200, lng: 78.3400, zoom: 11 },
    "Mancherial": { lat: 18.8700, lng: 79.4400, zoom: 11 },
    "Medak": { lat: 18.0400, lng: 78.2600, zoom: 11 },
    "Nirmal": { lat: 19.1000, lng: 78.3400, zoom: 11 },
    "Peddapalli": { lat: 18.6100, lng: 79.3700, zoom: 11 },
    "Rajanna Sircilla": { lat: 18.3800, lng: 78.8300, zoom: 11 },
    "Wanaparthy": { lat: 16.3600, lng: 78.0600, zoom: 11 },
    "Bhadradri Kothagudem": { lat: 17.5500, lng: 80.6200, zoom: 11 },
    "Jayashankar Bhupalpally": { lat: 18.4300, lng: 79.8600, zoom: 11 },
    "Jogulamba Gadwal": { lat: 16.2300, lng: 77.8000, zoom: 11 },
    "Komaram Bheem Asifabad": { lat: 19.3600, lng: 79.2900, zoom: 11 },
    "Mahabubabad": { lat: 17.6000, lng: 80.0100, zoom: 11 },
    "Mulugu": { lat: 18.1900, lng: 79.9400, zoom: 11 },
    "Nagarkurnool": { lat: 16.2900, lng: 78.3300, zoom: 11 },
    "Narayanpet": { lat: 16.7400, lng: 77.5000, zoom: 11 },
    "Hanamkonda": { lat: 18.0100, lng: 79.5600, zoom: 11 },
    "Visakhapatnam": { lat: 17.6868, lng: 83.2185, zoom: 11 },
    "Guntur": { lat: 15.9129, lng: 79.7400, zoom: 11 },
};
