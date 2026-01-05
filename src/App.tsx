import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DataProvider } from "@/context/DataContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "@/layouts/AdminLayout";
import ParentLayout from "@/layouts/ParentLayout";
import Login from "@/pages/Login";
import LoginSelection from "@/pages/LoginSelection";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Dashboard from "@/pages/admin/Dashboard";
import LiveTracking from "@/pages/admin/LiveTracking";
import Students from "@/pages/admin/Students";
import Buses from "@/pages/admin/Buses";
import Drivers from "@/pages/admin/Drivers";
import Attendance from "@/pages/admin/Attendance";
import Alerts from "@/pages/admin/Alerts";
import Settings from "@/pages/admin/Settings";
import ParentHome from "@/pages/parent/Home";
import LiveTrack from "@/pages/parent/LiveTrack";
import Notifications from "@/pages/parent/Notifications";
import Profile from "@/pages/parent/Profile";
import ParentSettings from "@/pages/parent/Settings";
import NotFound from "@/pages/NotFound";
import ParentContact from "@/pages/parent/Contact";
import ParentCaretaker from "@/pages/parent/Caretaker";
import DriverLayout from "@/layouts/DriverLayout";
import DriverDashboard from "@/pages/driver/Dashboard";
import DriverRoute from "@/pages/driver/Route";
import DriverNotifications from "@/pages/driver/Notifications";
import DriverCaretaker from "@/pages/driver/Caretaker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<LoginSelection />} />
              <Route path="/login/:role" element={<Login />} />
              <Route path="/login" element={<Navigate to="/" replace />} />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="tracking" element={<LiveTracking />} />
                <Route path="students" element={<Students />} />
                <Route path="buses" element={<Buses />} />
                <Route path="drivers" element={<Drivers />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Parent Routes */}
              <Route path="/parent" element={
                <ProtectedRoute allowedRole="parent">
                  <ParentLayout />
                </ProtectedRoute>
              }>
                <Route index element={<ParentHome />} />
                <Route path="track" element={<LiveTrack />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<Profile />} />
                <Route path="caretaker" element={<ParentCaretaker />} />
                <Route path="contact" element={<ParentContact />} />
                <Route path="settings" element={<ParentSettings />} />
              </Route>

              {/* Driver Routes */}
              <Route path="/driver" element={
                <ProtectedRoute allowedRole="driver">
                  <DriverLayout />
                </ProtectedRoute>
              }>
                <Route index element={<DriverDashboard />} />
                <Route path="route" element={<DriverRoute />} />
                <Route path="notifications" element={<DriverNotifications />} />
                <Route path="caretaker" element={<DriverCaretaker />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
