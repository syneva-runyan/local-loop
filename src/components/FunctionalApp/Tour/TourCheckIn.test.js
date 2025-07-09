import TourCheckIn from './TourCheckIn';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock the CSS file
jest.mock('./TourCheckIn.css', () => ({}));

describe('TourCheckIn', () => {
    beforeEach(() => {
        // Reset document.body.style.overflow before each test
        document.body.style.overflow = 'auto';
    });

    const mockProps = {
        stopName: 'Test Stop',
        detailsAboutStop: 'This is a test stop with interesting details.',
        citationsArray: ['https://example.com', 'Test Citation']
    };

    it('should render the learn more button with stop name', () => {
        render(<TourCheckIn {...mockProps} />);
        
        expect(screen.getByText('Learn More About Test Stop')).toBeInTheDocument();
    });

    it('should not show details initially', () => {
        render(<TourCheckIn {...mockProps} />);
        
        expect(screen.queryByText('Welcome to Test Stop!')).not.toBeInTheDocument();
        expect(screen.queryByText('This is a test stop with interesting details.')).not.toBeInTheDocument();
    });

    it('should show details when learn more button is clicked', () => {
        render(<TourCheckIn {...mockProps} />);
        
        const learnMoreButton = screen.getByText('Learn More About Test Stop');
        fireEvent.click(learnMoreButton);
        
        expect(screen.getByText('Welcome to Test Stop!')).toBeInTheDocument();
        expect(screen.getByText('This is a test stop with interesting details.')).toBeInTheDocument();
        expect(screen.getByText('Back to Itinerary')).toBeInTheDocument();
    });

    it('should hide details when back button is clicked', () => {
        render(<TourCheckIn {...mockProps} />);
        
        // First click learn more
        const learnMoreButton = screen.getByText('Learn More About Test Stop');
        fireEvent.click(learnMoreButton);
        
        // Then click back
        const backButton = screen.getByText('Back to Itinerary');
        fireEvent.click(backButton);
        
        expect(screen.queryByText('Welcome to Test Stop!')).not.toBeInTheDocument();
        expect(screen.queryByText('This is a test stop with interesting details.')).not.toBeInTheDocument();
    });

    it('should render citations when details are shown', () => {
        render(<TourCheckIn {...mockProps} />);
        
        const learnMoreButton = screen.getByText('Learn More About Test Stop');
        fireEvent.click(learnMoreButton);
        
        // Should render both citations
        expect(screen.getByRole('link')).toBeInTheDocument();
        expect(screen.getByText('Test Citation')).toBeInTheDocument();
    });

    it('should handle empty citations array', () => {
        const propsWithNoCitations = {
            ...mockProps,
            citationsArray: []
        };
        
        render(<TourCheckIn {...propsWithNoCitations} />);
        
        const learnMoreButton = screen.getByText('Learn More About Test Stop');
        fireEvent.click(learnMoreButton);
        
        expect(screen.getByText('Welcome to Test Stop!')).toBeInTheDocument();
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should disable/enable body scroll when showing/hiding details', () => {
        render(<TourCheckIn {...mockProps} />);
        
        // Initially body should have auto scroll
        expect(document.body.style.overflow).toBe('auto');
        
        const learnMoreButton = screen.getByText('Learn More About Test Stop');
        fireEvent.click(learnMoreButton);
        
        // When details are shown, body scroll should be disabled
        expect(document.body.style.overflow).toBe('hidden');
        
        const backButton = screen.getByText('Back to Itinerary');
        fireEvent.click(backButton);
        
        // When details are hidden, body scroll should be enabled
        expect(document.body.style.overflow).toBe('auto');
    });

    it('should render raven image in animation container', () => {
        render(<TourCheckIn {...mockProps} />);
        
        const learnMoreButton = screen.getByText('Learn More About Test Stop');
        fireEvent.click(learnMoreButton);
        
        const ravenImage = screen.getByAltText('Flying Raven');
        expect(ravenImage).toBeInTheDocument();
        expect(ravenImage).toHaveAttribute('src', '/LocalLoopLogo.png');
    });
});