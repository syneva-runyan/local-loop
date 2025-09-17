import Tour from './Tour';
import { render, screen } from '@testing-library/react';

describe("Tour", () => {
    const mockTour = {
        tourName: "Test Tour",
        shortTourDescription: "A test tour description",
        photo: { 
            src: "test.jpg", 
            width: 100, 
            height: 100 
        },
        stops: [{ 
            stopName: "abc",
            shortDescription: "Test stop description",
            durationToSpendAt: "10 minutes"
        }]
    };

    beforeEach(() => {
        render(<Tour tour={mockTour} />);
    })

    it("should set the current stop to 0 when start tour button is clicked", () => {
        const startTourButton = screen.getByText("Start Tour");
        startTourButton.click();
        expect(screen.getByText("abc")).toBeInTheDocument();
    });
});