import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, CircleMarker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Bus } from '@/types';
import { Maximize2, Target, Navigation, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

// SVG for Bus Icon with Direction Arrow
const createBusIconHtml = (color = '#FBBF24', heading = 0) => `
    < div class="relative group" >
  <div class="bus-icon-container" style="transform: rotate(${heading}deg); transition: transform 0.5s ease;">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="30" height="20" rx="4" fill="${color}" stroke="#D97706" stroke-width="2"/>
      <rect x="8" y="14" width="6" height="6" rx="1" fill="#BAE6FD" stroke="#0284C7" stroke-width="1"/>
      <rect x="17" y="14" width="6" height="6" rx="1" fill="#BAE6FD" stroke="#0284C7" stroke-width="1"/>
      <rect x="26" y="14" width="6" height="6" rx="1" fill="#BAE6FD" stroke="#0284C7" stroke-width="1"/>
      <circle cx="12" cy="30" r="3" fill="#1F2937"/>
      <circle cx="28" cy="30" r="3" fill="#1F2937"/>
      <rect x="10" y="24" width="20" height="2" fill="#D97706"/>
      <!-- Direction Arrow -->
      <path d="M20 5L24 10H16L20 5Z" fill="#1F2937" />
    </svg>
  </div>
  <div class="absolute -top-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded shadow-lg pointer-events-none whitespace-nowrap">
    Bus Heading: ${heading}°
  </div>
</div >
    `;

const createBusIcon = (color = '#FBBF24', heading = 0) => {
    return L.divIcon({
        html: createBusIconHtml(color, heading),
        className: 'custom-bus-icon-div',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });
};

const StopIcon = L.divIcon({
    html: `< div class="w-4 h-4 rounded-full bg-white border-4 border-blue-500 shadow-md transition-transform hover:scale-125" ></div > `,
    className: 'custom-stop-icon',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
});

interface Stop {
    name: string;
    lat: number;
    lng: number;
    status: 'passed' | 'next' | 'upcoming';
}

interface MapProps {
    buses: Bus[];
    stops?: Stop[];
    center?: { lat: number; lng: number };
    zoom?: number;
    onBusClick?: (busId: string) => void;
    autoCenter?: boolean;
    highlightLocation?: {
        name: string;
        lat: number;
        lng: number;
        zoom?: number;
        type: 'state' | 'district';
    } | null;
    noData?: boolean;
}

const defaultCenter: [number, number] = [17.3850, 78.4867];

// Component to handle map center updates and custom interactions
const MapController = ({
    center,
    isLocked,
    highlightLocation
}: {
    center?: { lat: number; lng: number },
    isLocked: boolean,
    highlightLocation?: MapProps['highlightLocation']
}) => {
    const map = useMap();

    useEffect(() => {
        if (highlightLocation) {
            map.flyTo([highlightLocation.lat, highlightLocation.lng], highlightLocation.zoom || map.getZoom(), {
                animate: true,
                duration: 1.5
            });
        } else if (center && isLocked) {
            map.flyTo([center.lat, center.lng], map.getZoom(), {
                animate: true,
                duration: 1.5
            });
        }
    }, [center, isLocked, highlightLocation, map]);

    return null;
};

const LiveMap = ({
    buses,
    stops = [],
    center,
    zoom = 14,
    onBusClick,
    autoCenter = true,
    highlightLocation,
    noData = false
}: MapProps) => {
    const [selectedBusId, setSelectedBusId] = useState<string | null>(null);
    const [isLocked, setIsLocked] = useState(autoCenter);
    const mapRef = useRef<L.Map | null>(null);

    const mapCenter = useMemo(() =>
        center ? [center.lat, center.lng] as [number, number] : defaultCenter
        , [center]);

    const polylinePositions = useMemo(() =>
        stops.map(stop => [stop.lat, stop.lng] as [number, number])
        , [stops]);

    const activeBus = useMemo(() =>
        buses.find(b => b.id === selectedBusId) || buses[0]
        , [buses, selectedBusId]);

    const toggleFullscreen = () => {
        const mapContainer = document.getElementById('map-wrapper');
        if (!document.fullscreenElement) {
            mapContainer?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div id="map-wrapper" className="relative w-full h-full group bg-slate-100 overflow-hidden rounded-3xl">
            <style>
                {`
    .leaflet - marker - icon {
    transition: all 0.5s cubic - bezier(0.4, 0, 0.2, 1);
}
                .custom - bus - icon - div {
    z - index: 1000!important;
}
`}
            </style>

            <MapContainer
                center={mapCenter}
                zoom={zoom}
                style={{ width: '100%', height: '100%' }}
                className="z-0"
                zoomControl={false}
                ref={mapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                <MapController
                    center={center}
                    isLocked={isLocked}
                    highlightLocation={highlightLocation}
                />
                <ZoomControl position="bottomright" />

                {/* Location Highlight */}
                {highlightLocation && (
                    <>
                        <CircleMarker
                            center={[highlightLocation.lat, highlightLocation.lng]}
                            pathOptions={{
                                color: highlightLocation.type === 'district' ? '#3b82f6' : '#22c55e',
                                fillColor: highlightLocation.type === 'district' ? '#3b82f6' : '#22c55e',
                                fillOpacity: 0.1,
                                weight: 2,
                                dashArray: '5, 10'
                            }}
                            radius={highlightLocation.type === 'district' ? 100 : 500}
                        />
                        <Marker
                            position={[highlightLocation.lat, highlightLocation.lng]}
                            icon={L.divIcon({
                                html: `<div class="bg-white/90 backdrop-blur-sm border-2 border-primary rounded-full px-3 py-1 shadow-lg whitespace-nowrap font-bold text-xs flex items-center gap-1">
                                    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                    ${highlightLocation.name}
                                </div>`,
                                className: 'location-label-icon',
                                iconAnchor: [50, 40]
                            })}
                        />
                    </>
                )}

                {/* Route Line */}
                {polylinePositions.length > 1 && (
                    <Polyline
                        positions={polylinePositions}
                        color="#3b82f6"
                        weight={5}
                        opacity={0.4}
                        lineCap="round"
                    />
                )}

                {/* Stops */}
                {stops.map((stop, idx) => (
                    <Marker
                        key={`stop - ${idx} `}
                        position={[stop.lat, stop.lng]}
                        icon={StopIcon}
                    >
                        <Popup className="custom-popup">
                            <div className="p-1 font-semibold text-slate-700 flex items-center gap-2">
                                <div className={cn("w-2 h-2 rounded-full",
                                    stop.status === 'passed' ? 'bg-emerald-500' :
                                        stop.status === 'next' ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'
                                )} />
                                {stop.name}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Buses */}
                {buses.map((bus) => (
                    bus.location && (
                        <React.Fragment key={bus.id}>
                            <CircleMarker
                                center={[bus.location.lat, bus.location.lng]}
                                pathOptions={{
                                    color: bus.status === 'delayed' ? '#ef4444' : '#3b82f6',
                                    fillColor: bus.status === 'delayed' ? '#ef4444' : '#3b82f6',
                                    fillOpacity: 0.15,
                                    weight: 1
                                }}
                                radius={25}
                                className="animate-pulse"
                            />

                            <Marker
                                position={[bus.location.lat, bus.location.lng]}
                                icon={createBusIcon(
                                    bus.status === 'delayed' ? '#EF4444' : '#FBBF24',
                                    (bus.speed || 0) * 4.5
                                )}
                                eventHandlers={{
                                    click: () => {
                                        setSelectedBusId(bus.id);
                                        if (onBusClick) onBusClick(bus.id);
                                    },
                                    popupclose: () => setSelectedBusId(null)
                                }}
                            >
                                <Popup>
                                    <div className="p-3 min-w-[220px]">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-800 leading-none">{bus.busNumber}</h3>
                                                <p className="text-[10px] text-slate-500 mt-1">{bus.route}</p>
                                            </div>
                                            <span className={cn("px-2 py-1 rounded-lg text-[10px] uppercase font-bold",
                                                bus.status === 'on-route' ? 'bg-emerald-100 text-emerald-700' :
                                                    bus.status === 'delayed' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                                            )}>
                                                {bus.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 mb-3">
                                            <div className="bg-slate-50 p-2 rounded-lg">
                                                <p className="text-[9px] text-slate-400 uppercase font-bold">Driver</p>
                                                <p className="text-xs font-semibold text-slate-700">{bus.driver}</p>
                                            </div>
                                            <div className="bg-slate-50 p-2 rounded-lg">
                                                <p className="text-[9px] text-slate-400 uppercase font-bold">Speed</p>
                                                <p className="text-xs font-semibold text-slate-700">{bus.speed} km/h</p>
                                            </div>
                                        </div>

                                        {bus.isHarshDriving && (
                                            <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2">
                                                <Info className="w-3 h-3 text-amber-600" />
                                                <p className="text-[10px] text-amber-700 font-bold">Sudden Movement Detected</p>
                                            </div>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        </React.Fragment>
                    )
                ))}
            </MapContainer>

            {/* Premium Controls */}
            <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
                <button
                    onClick={() => setIsLocked(!isLocked)}
                    className={cn(
                        "p-2.5 rounded-xl shadow-xl transition-all border",
                        isLocked
                            ? "bg-blue-600 border-blue-500 text-white"
                            : "bg-white/90 border-slate-200 text-slate-600 hover:bg-white"
                    )}
                    title={isLocked ? "Unlock Map" : "Lock to Bus"}
                >
                    <Target className={cn("w-5 h-5", isLocked && "animate-pulse")} />
                </button>
                <button
                    onClick={toggleFullscreen}
                    className="p-2.5 bg-white/90 border border-slate-200 rounded-xl shadow-xl text-slate-600 hover:bg-white transition-all"
                    title="Fullscreen"
                >
                    <Maximize2 className="w-5 h-5" />
                </button>
            </div>

            {/* Info Overlay */}
            {activeBus && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-sm transition-all duration-500 transform hover:scale-[1.02]">
                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-2xl">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                    <Navigation className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-wider">Live Tracking</p>
                                    <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
                                        {activeBus.busNumber}
                                    </h4>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-2 justify-end">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">LIVE</span>
                                </div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                                    Updated just now
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                            <div className="text-center">
                                <p className="text-[9px] text-slate-400 uppercase font-bold">Speed</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{activeBus.speed} km/h</p>
                            </div>
                            <div className="text-center border-x border-slate-100 dark:border-slate-800">
                                <p className="text-[9px] text-slate-400 uppercase font-bold">Capacity</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{activeBus.passengers}/{activeBus.capacity}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[9px] text-slate-400 uppercase font-bold">Status</p>
                                <p className={cn("text-xs font-bold",
                                    activeBus.status === 'on-route' ? 'text-emerald-600' : 'text-amber-600'
                                )}>{activeBus.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* No Data Overlay */}
            {noData && (
                <div className="absolute inset-0 z-[1001] flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
                    <div className="bg-white/90 dark:bg-slate-900/90 p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 text-center animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Info className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No Buses Found</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">There are currently no active buses operating in this area.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(LiveMap);
