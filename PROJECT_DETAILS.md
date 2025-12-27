# Comprehensive Project Specifications: Bus ERP

This document contains is the ultimate technical reference for the **Bus ERP (Bus Management System)**. It covers data models, logic, design systems, and operational parameters.

---

## 1. Technical Architecture

### Core Stack
- **Library**: React 18 (Functional Components, Hooks)
- **Build Tool**: Vite (configured for Fast Refresh and build optimization)
- **Language**: TypeScript 5.x (Strict Mode)
- **Styling**: Tailwind CSS 3.4
- **UI Framework**: shadcn/ui (Radix UI as foundation)
- **Routing**: React Router DOM 6.30

---

## 2. Detailed Data Models (TypeScript Interfaces)

### Student Object
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique identifier (UUID generated) |
| `name` | `string` | Full name of the student |
| `class` | `string` | Grade and Section (e.g., "Grade 5A") |
| `rfid` | `string` | Scanning card ID |
| `route` | `string` | Name of the assigned bus route |
| `parent` | `string` | Primary contact name |
| `phone` | `string` | Emergency contact number |
| `status` | `active \| inactive` | Enrollment status |
| `location fields` | `string?` | Optional state, mandal, district, country |

### Bus Object
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Bus number or asset ID |
| `busNumber` | `string` | Display name (e.g., "Bus 101") |
| `driver` | `string` | Name of assigned driver |
| `status` | `enum` | `on-route`, `delayed`, `idle`, `maintenance`, `completed` |
| `passengers` | `number` | Current boarding count |
| `capacity` | `number` | Max seats (Default: 40) |
| `location` | `obj` | `{ lat: number, lng: number }` |
| `speed` | `number` | Real-time velocity in km/h |
| `isHarshDriving` | `boolean` | Flag for sudden braking/acceleration |
| `isSOS` | `boolean` | Emergency panic button state |

---

## 3. Business Logic & Simulations

### Real-time Movement Simulation
Located in `src/context/DataContext.tsx`, the system uses a 3-second heartbeat:
- **Coordinate Jitter**: Latitude and Longitude are updated by `±0.001` to simulate GPS drifting.
- **Speed Logic**: Speed is randomized between `0-80 km/h` for active buses.
- **Harsh Driving Trigger**: 5% statistical chance (`Math.random() > 0.95`) to trigger a harsh driving alert.
- **State Persistence**: Uses `localStorage` to save user changes; uses a `DATA_VERSION` constant to force-clear stale cache when schemas update.

### Multi-Role Routing
The app uses a `ProtectedRoute` wrapper that checks the `role` parameter in the URL:
- `/admin/*`: Accessible only to tokens with `admin` role.
- `/parent/*`: Accessible only to tokens with `parent` role.
- `/driver/*`: Accessible only to tokens with `driver` role.

---

## 4. UI Design System

### Design Tokens (via Tailwind)
- **Primary Color**: HSL-based blue for trust and safety (`--primary`).
- **Success/Warning/Destructive**: Semantic colors for status indicators (Boarding vs. Deviation).
- **Glassmorphism**: Heavy use of `backdrop-blur` and `bg-white/90` for the Map controller interface.
- **Typography**: Inter (System Default) with heavy weight for status labels.

### Map Component Specifications
- **Provider**: CartoDB Voyager (Clean, high-visibility tiles).
- **Bus Markers**: Custom SVG icons with a "heading arrow" that rotates based on the simulated speed data.
- **Pulse Effect**: `animate-pulse` used on a base circle marker to indicate live data transmission.

---

## 5. Feature Breakdown

### Admin Dashboard
- **Live Fleet Tracking**: All buses visible simultaneously on a global map.
- **Student Management**: Full CRUD operations for student registration.
- **Attendance Analytics**: Interactive charts (Recharts) for boarding rates.

### Parent Portal
- **Child's Bus Live Tracking**: Focused view of only their assigned bus.
- **Geo-Alerts**: Local notifications when the bus is within 1km.
- **Direct Contact**: Quick-dial support for the school transport desk.

### Driver Dashboard
- **Turn-by-Turn Visualization**: View the entire route polyline.
- **Stop List**: Marked with status (Passed, Next, Upcoming).
- **Incident Reporting**: Shift-end log submissions.

---

## 6. Deployment Workflow

### Netlify Configuration (`netlify.toml`)
- **Build Command**: `npm run build`
- **Output**: `dist`
- **Routing**: `_redirects` file ensures React Router works on page refreshes.

### Version Control
- **GitHub Auth**: CLI based (`gh auth login`).
- **Standard**: Semantic commits (`feat:`, `fix:`, `docs:`).

---
*End of Specifications Document*
