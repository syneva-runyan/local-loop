import FadeIn from './FadeIn';
import { render, screen, act } from '@testing-library/react';

// Mock CSS classes for testing
jest.mock('./FadeIn.css', () => ({}));

describe('FadeIn', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        act(() => {
            jest.runOnlyPendingTimers();
        });
        jest.useRealTimers();
    });

    it('should initially render without visible class', () => {
        const { container } = render(
            <FadeIn>
                <div>Test content</div>
            </FadeIn>
        );
        
        const fadeDiv = container.firstChild;
        expect(fadeDiv).toHaveClass('fade-in');
        expect(fadeDiv).not.toHaveClass('visible');
        expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should add visible class after default timer', () => {
        const { container } = render(
            <FadeIn>
                <div>Test content</div>
            </FadeIn>
        );
        
        const fadeDiv = container.firstChild;
        expect(fadeDiv).not.toHaveClass('visible');
        
        act(() => {
            jest.advanceTimersByTime(10);
        });
        
        expect(fadeDiv).toHaveClass('visible');
    });

    it('should use custom fadeTimer', () => {
        const { container } = render(
            <FadeIn fadeTimer={100}>
                <div>Test content</div>
            </FadeIn>
        );
        
        const fadeDiv = container.firstChild;
        expect(fadeDiv).not.toHaveClass('visible');
        
        // Should not be visible after default timer
        act(() => {
            jest.advanceTimersByTime(10);
        });
        expect(fadeDiv).not.toHaveClass('visible');
        
        // Should be visible after custom timer
        act(() => {
            jest.advanceTimersByTime(90);
        });
        expect(fadeDiv).toHaveClass('visible');
    });

    it('should render children correctly', () => {
        render(
            <FadeIn>
                <div>First child</div>
                <span>Second child</span>
            </FadeIn>
        );
        
        expect(screen.getByText('First child')).toBeInTheDocument();
        expect(screen.getByText('Second child')).toBeInTheDocument();
    });

    it('should clean up timeout on unmount', () => {
        const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
        
        const { unmount } = render(
            <FadeIn>
                <div>Test content</div>
            </FadeIn>
        );
        
        unmount();
        
        expect(clearTimeoutSpy).toHaveBeenCalled();
        clearTimeoutSpy.mockRestore();
    });
});