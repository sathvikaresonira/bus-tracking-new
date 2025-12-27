import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Students from './admin/Students';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import * as DataContext from '@/context/DataContext';

// Mock Dependencies
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

// Mock Data Context
const mockAddStudent = vi.fn();
const mockDeleteStudent = vi.fn();
const mockUpdateStudent = vi.fn();
const mockRestoreStudent = vi.fn();

const mockContextValue = {
    students: [
        { id: '1', name: 'Test Student', class: '5A', rfid: 'RF123', status: 'active', route: 'Route A', parent: 'Parent', phone: '123' }
    ],
    buses: [],
    routes: [],
    alerts: [],
    drivers: [],
    stats: { totalStudents: 1, activeBuses: 0, todaysScans: 0, notificationsSent: 0 },
    searchQuery: '',
    setSearchQuery: vi.fn(),
    addStudent: mockAddStudent,
    deleteStudent: mockDeleteStudent,
    updateStudent: mockUpdateStudent,
    restoreStudent: mockRestoreStudent,
    addBus: vi.fn(),
    updateBus: vi.fn(),
    deleteBus: vi.fn(),
    addRoute: vi.fn(),
    updateRoute: vi.fn(),
    deleteRoute: vi.fn(),
    addDriver: vi.fn(),
    updateDriver: vi.fn(),
    deleteDriver: vi.fn(),
    refreshData: vi.fn(),
};

describe('Comprehensive UI Tests', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        // Spy on useData to return our mock value
        vi.spyOn(DataContext, 'useData').mockReturnValue(mockContextValue as any);
    });

    // 1. Login Page Interaction Test
    it('Login page updates input fields and submits', () => {
        render(
            <MemoryRouter initialEntries={['/login/admin']}>
                <Routes>
                    <Route path="/login/:role" element={<Login />} />
                </Routes>
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText(/Email/i);
        const passInput = screen.getByLabelText(/Password/i);
        const submitBtn = screen.getByRole('button', { name: /Sign In/i });

        fireEvent.change(emailInput, { target: { value: 'test@admin.com' } });
        fireEvent.change(passInput, { target: { value: 'password123' } });

        expect(emailInput).toHaveValue('test@admin.com');
        expect(passInput).toHaveValue('password123');

        fireEvent.click(submitBtn);
        // We assume navigation logic works if no error is thrown and functional checks pass
        // (Navigation itself is mocked)
    });

    // 2. Protected Route Security Test
    it('ProtectedRoute redirects unauthenticated users', () => {
        // Mock localStorage to return null (unauthenticated)
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: vi.fn(() => null),
            },
            writable: true
        });

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route path="/" element={<div>Login Page</div>} />
                    <Route
                        path="/protected"
                        element={
                            <ProtectedRoute>
                                <div>Secret Content</div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        // Should be redirected to login (aka "/" which renders Login Page div)
        expect(screen.getByText('Login Page')).toBeInTheDocument();
        expect(screen.queryByText('Secret Content')).not.toBeInTheDocument();
    });

    it('ProtectedRoute renders content for authenticated users', () => {
        // Mock localStorage to return authenticated
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: vi.fn((key) => {
                    if (key === 'isAuthenticated') return 'true';
                    if (key === 'userRole') return 'admin';
                    return null;
                }),
            },
            writable: true
        });

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route
                        path="/protected"
                        element={
                            <ProtectedRoute allowedRole="admin">
                                <div>Secret Content</div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Secret Content')).toBeInTheDocument();
    });

    // 3. Admin Page Data Rendering Test
    it('Students page renders student list from context', () => {
        render(
            <MemoryRouter>
                <Students />
            </MemoryRouter>
        );

        expect(screen.getByText('Student Management')).toBeInTheDocument();
        expect(screen.getByText('Test Student')).toBeInTheDocument();
        expect(screen.getByText('5A')).toBeInTheDocument();
    });

    // 4. Interaction Test: Opening Add Dialog
    it('Opens Add Student dialog on button click', async () => {
        render(
            <MemoryRouter>
                <Students />
            </MemoryRouter>
        );

        const addBtn = screen.getByText('Add Student');
        fireEvent.click(addBtn);

        await waitFor(() => {
            expect(screen.getByText('Add New Student')).toBeInTheDocument();
        });
    });
});
