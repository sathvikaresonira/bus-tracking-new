import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoginSelection from './pages/LoginSelection';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
    it('renders the login selection page by default', () => {
        render(
            <BrowserRouter>
                <LoginSelection />
            </BrowserRouter>
        );
        expect(screen.getByText('Welcome to BusTrack')).toBeInTheDocument();
        expect(screen.getByText('Please select your role to continue')).toBeInTheDocument();
    });
});
