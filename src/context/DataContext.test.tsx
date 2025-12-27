import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DataProvider, useData } from '../context/DataContext';
import { renderHook, act } from '@testing-library/react';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('DataContext Persistence', () => {
    beforeEach(() => {
        localStorageMock.clear();
        vi.restoreAllMocks();
    });

    it('loads initial data when localStorage is empty', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => <DataProvider>{children}</DataProvider>;
        const { result } = renderHook(() => useData(), { wrapper });

        expect(result.current.students.length).toBeGreaterThan(0);
    });

    it('loads persistent data from localStorage', () => {
        const mockStudents = [{ id: '123', name: 'Test Student', class: '5A', rfid: 'RF123', route: 'A', parent: 'P', phone: '123', status: 'active' }];
        localStorage.setItem('students', JSON.stringify(mockStudents));

        const wrapper = ({ children }: { children: React.ReactNode }) => <DataProvider>{children}</DataProvider>;
        const { result } = renderHook(() => useData(), { wrapper });

        expect(result.current.students).toHaveLength(1);
        expect(result.current.students[0].name).toBe('Test Student');
    });

    it('persists data when a student is added', async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => <DataProvider>{children}</DataProvider>;
        const { result } = renderHook(() => useData(), { wrapper });

        const newStudent = {
            name: 'New Kid',
            class: '1A',
            rfid: 'RF999',
            route: 'B',
            parent: 'Mom',
            phone: '555',
            status: 'active' as const
        };

        act(() => {
            result.current.addStudent(newStudent);
        });

        await waitFor(() => {
            const stored = JSON.parse(localStorage.getItem('students') || '[]');
            expect(stored.some((s: any) => s.name === 'New Kid')).toBe(true);
        });
    });
});
