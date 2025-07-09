import HowMuchTimeDoYouHave from './HowMuchTImeDoYouHave';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock the CSS file
jest.mock('./HowMuchTimeDoYouHave.css', () => ({}));

describe('HowMuchTimeDoYouHave', () => {
    it('should render the question and input fields', () => {
        render(<HowMuchTimeDoYouHave />);
        
        expect(screen.getByText('How long do you have?')).toBeInTheDocument();
        expect(screen.getByLabelText('Hours')).toBeInTheDocument();
        expect(screen.getByLabelText('Minutes')).toBeInTheDocument();
    });

    it('should have default values of 2 hours and 30 minutes', () => {
        render(<HowMuchTimeDoYouHave />);
        
        const hoursInput = screen.getByLabelText('Hours');
        const minutesInput = screen.getByLabelText('Minutes');
        
        expect(hoursInput).toHaveValue(2);
        expect(minutesInput).toHaveValue(30);
    });

    it('should update hours when valid input is provided', () => {
        render(<HowMuchTimeDoYouHave />);
        
        const hoursInput = screen.getByLabelText('Hours');
        
        fireEvent.change(hoursInput, { target: { value: '3' } });
        
        expect(hoursInput).toHaveValue(3);
    });

    it('should update minutes when valid input is provided', () => {
        render(<HowMuchTimeDoYouHave />);
        
        const minutesInput = screen.getByLabelText('Minutes');
        
        fireEvent.change(minutesInput, { target: { value: '45' } });
        
        expect(minutesInput).toHaveValue(45);
    });

    it('should not accept hours greater than 4', () => {
        render(<HowMuchTimeDoYouHave />);
        
        const hoursInput = screen.getByLabelText('Hours');
        
        fireEvent.change(hoursInput, { target: { value: '5' } });
        
        // Should still be the previous value (2, the default)
        expect(hoursInput).toHaveValue(2);
    });

    it('should not accept hours less than 0', () => {
        render(<HowMuchTimeDoYouHave />);
        
        const hoursInput = screen.getByLabelText('Hours');
        
        fireEvent.change(hoursInput, { target: { value: '-1' } });
        
        // Should still be the previous value (2, the default)
        expect(hoursInput).toHaveValue(2);
    });

    it('should not accept minutes greater than 59', () => {
        render(<HowMuchTimeDoYouHave />);
        
        const minutesInput = screen.getByLabelText('Minutes');
        
        fireEvent.change(minutesInput, { target: { value: '60' } });
        
        // Should still be the previous value (30, the default)
        expect(minutesInput).toHaveValue(30);
    });

    it('should not accept minutes less than 0', () => {
        render(<HowMuchTimeDoYouHave />);
        
        const minutesInput = screen.getByLabelText('Minutes');
        
        fireEvent.change(minutesInput, { target: { value: '-5' } });
        
        // Should still be the previous value (30, the default)
        expect(minutesInput).toHaveValue(30);
    });

    it('should have correct input types and structure', () => {
        render(<HowMuchTimeDoYouHave />);
        
        const hoursInput = screen.getByLabelText('Hours');
        const minutesInput = screen.getByLabelText('Minutes');
        
        expect(hoursInput).toHaveAttribute('type', 'number');
        expect(minutesInput).toHaveAttribute('type', 'number');
        
        expect(hoursInput).toHaveAttribute('id', 'hours');
        expect(hoursInput).toHaveAttribute('name', 'hours');
        expect(minutesInput).toHaveAttribute('id', 'minutes');
    });
});