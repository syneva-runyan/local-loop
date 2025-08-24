import getTour from './getTour';
import constants from './constants';

// Mock fetch globally
global.fetch = jest.fn();

describe('getTour', () => {
    let consoleErrorSpy;

    beforeEach(() => {
        fetch.mockClear();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
        jest.restoreAllMocks();
    });

    it('should make a GET request with correct parameters', async () => {
        const mockResponse = { 
            tourName: 'Test Tour',
            stops: [{ stopName: 'Test Stop' }]
        };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const location = 'Test Location';
        const tourId = 'test-tour-123';

        await getTour(location, tourId);

        expect(fetch).toHaveBeenCalledTimes(1);
        
        const callArgs = fetch.mock.calls[0];
        const url = new URL(callArgs[0]);
        
        expect(url.origin + url.pathname).toBe(constants.GET_TOUR_ENDPOINT);
        expect(url.searchParams.get('location')).toBe(encodeURIComponent(location));
        expect(url.searchParams.get('tourId')).toBe(encodeURIComponent(tourId));
        
        expect(callArgs[1]).toEqual({
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
    });

    it('should return parsed response on success', async () => {
        const mockResponse = { 
            tourName: 'Test Tour',
            stops: [{ stopName: 'Test Stop' }],
            location: 'Test Location'
        };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await getTour('Test Location', 'test-tour-123');
        
        expect(result).toEqual(mockResponse);
    });

    it('should handle HTTP errors', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        const result = await getTour('Test Location', 'invalid-tour');
        
        expect(result).toEqual({ error: true });
    });

    it('should handle network errors', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const result = await getTour('Test Location', 'test-tour-123');
        
        expect(result).toEqual({ error: true });
    });

    it('should handle special characters in parameters', async () => {
        const mockResponse = { tourName: 'Test Tour' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const location = 'Location with spaces & symbols';
        const tourId = 'tour-with-special-chars-@#$';

        await getTour(location, tourId);

        const callArgs = fetch.mock.calls[0];
        const url = new URL(callArgs[0]);
        
        expect(url.searchParams.get('location')).toBe(encodeURIComponent(location));
        expect(url.searchParams.get('tourId')).toBe(encodeURIComponent(tourId));
    });

    it('should handle JSON parsing errors', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                throw new Error('Invalid JSON');
            },
        });

        const result = await getTour('Test Location', 'test-tour-123');
        
        expect(result).toEqual({ error: true });
    });
});