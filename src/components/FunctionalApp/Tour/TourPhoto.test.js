import TourPhoto from './TourPhoto';
import { render, screen } from '@testing-library/react';

describe("Tour Photo", () => {
    // Mock window.innerWidth
    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
        });
    });

    it("should calculate placeholder width and height based on photo size and current window width", () => {
        window.innerWidth = 650;
        
        render(<TourPhoto tourPhoto={{ 
            src: "test.jpg", 
            height: 1200, 
            width: 1000,
            photo_reference: "test_ref",
            html_attributions: "Test Attribution"
        }} />);
        
        const photo = screen.getByAltText("tour preview");
        expect(photo).toHaveStyle({
            minWidth: "650px",
            minHeight: "400px", // Capped at 400px maximum
        });
    });

    it('should never exceed 1000px width', () => {
        window.innerWidth = 1200;
        
        render(<TourPhoto tourPhoto={{ 
            src: "test.jpg", 
            height: 1200, 
            width: 1000,
            photo_reference: "test_ref",
            html_attributions: "Test Attribution"
        }} />);
        
        const photo = screen.getByAltText("tour preview");
        expect(photo).toHaveStyle({
            minWidth: "1000px",
            minHeight: "400px", // Capped at 400px maximum
        });
    });

    it('should return null when photo dimensions are missing', () => {
        const { container } = render(<TourPhoto tourPhoto={{}} />);
        expect(container.firstChild).toBeNull();
    });

    it('should render photo attribution', () => {
        window.innerWidth = 800;
        
        render(<TourPhoto tourPhoto={{ 
            height: 600, 
            width: 800,
            photo_reference: "test_ref",
            html_attributions: '<a href="#">Test Attribution</a>'
        }} />);
        
        expect(screen.getByText('Photo by')).toBeInTheDocument();
    });
});