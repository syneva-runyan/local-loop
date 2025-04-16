import TourPhoto from './TourPhoto';
import { render, screen } from '@testing-library/react';

describe("Tour Photo", () => {
    beforeEach(() => {
        render(<TourPhoto photo={{ src: "test.jpg", height: 1200, width: 1000 }} />);
    })

    
    it("should calculate placeholder width and height based on photo size and current window width", () => {
        window.screen.width = 650;
        const photo = screen.getByAltText("tour preview");
        expect(photo).toHaveStyle({
            minWidth: "650px",
            minHeight: "780px",
        });
    });

    it('should never exceed 1000px width', () => {
        window.screen.width = 1200;
        const photo = screen.getByAltText("tour preview");
        expect(photo).toHaveStyle({
            minWidth: "1000px",
            minHeight: "1200px",
        });
    });
});