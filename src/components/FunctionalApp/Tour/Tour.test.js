import Tour from './Tour';
import { render, screen } from '@testing-library/react';

describe("Tour", () => {
    beforeEach(() => {
        render(<Tour tour={{ stops: [{ stopName: "abc" }] }} />);
    })

    it("should set the current stop to 0 when start tour button is clicked", () => {
        const startTourButton = screen.getByText("Start Tour");
        startTourButton.click();
        expect(screen.getByText("abc")).toBeInTheDocument();
    });
});