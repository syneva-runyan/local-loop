import AppHeader from './AppHeader';
import { render, screen } from '@testing-library/react';

// Mock the CSS file
jest.mock('./AppHeader.css', () => ({}));

describe('AppHeader', () => {
    it('should render the Local Loop logo and title', () => {
        render(<AppHeader />);
        
        const logo = screen.getByAltText('local loop logo');
        const title = screen.getByText('Local Loop');
        
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', './LocalLoopLogo.png');
        expect(logo).toHaveClass('appHeaderLogo');
        
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass('appHeaderTitle');
    });

    it('should have correct header structure and classes', () => {
        const { container } = render(<AppHeader />);
        
        const header = container.querySelector('header');
        expect(header).toHaveClass('appHeader');
        
        const logoContainer = container.querySelector('.appHeaderLogoContainer');
        expect(logoContainer).toBeInTheDocument();
    });
});