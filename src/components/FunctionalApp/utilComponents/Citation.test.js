import Citation from './Citation';
import { render, screen } from '@testing-library/react';

describe('Citation', () => {
    it('should render URL citations as clickable links', () => {
        const url = 'https://example.com';
        const { container } = render(<Citation citation={url} isLast={false} />);
        
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', url + '/'); // URL constructor adds trailing slash
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        expect(link).toHaveTextContent('example.com');
        
        // Check that comma is present in the container
        expect(container.textContent).toContain(', ');
    });

    it('should remove www from domain names', () => {
        const url = 'https://www.example.com/path';
        render(<Citation citation={url} isLast={false} />);
        
        const link = screen.getByRole('link');
        expect(link).toHaveTextContent('example.com');
    });

    it('should add comma when not last citation', () => {
        const url = 'https://example.com';
        const { container } = render(<Citation citation={url} isLast={false} />);
        
        expect(container.textContent).toContain(', ');
    });

    it('should not add comma when last citation', () => {
        const url = 'https://example.com';
        const { container } = render(<Citation citation={url} isLast={true} />);
        
        expect(container.textContent).not.toContain(', ');
    });

    it('should render non-URL citations as text spans', () => {
        const citation = 'Some book reference';
        const { container } = render(<Citation citation={citation} isLast={false} />);
        
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
        expect(container.textContent).toContain('Some book reference');
        expect(container.textContent).toContain(', ');
    });

    it('should not render numeric citations', () => {
        const { container } = render(<Citation citation="123" isLast={false} />);
        expect(container.firstChild).toBeNull();
    });

    it('should handle invalid URLs gracefully', () => {
        const invalidUrl = 'not-a-url';
        const { container } = render(<Citation citation={invalidUrl} isLast={false} />);
        
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
        expect(container.textContent).toContain('not-a-url');
    });

    it('should handle malformed URLs', () => {
        const malformedUrl = 'http://';
        const { container } = render(<Citation citation={malformedUrl} isLast={true} />);
        
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
        expect(container.textContent).toContain('http://');
    });
});