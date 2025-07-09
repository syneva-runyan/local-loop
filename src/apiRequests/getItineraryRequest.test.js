import getItinerary from './getItineraryRequest';
import constants from './constants';

// Mock fetch globally
global.fetch = jest.fn();

describe('getItinerary', () => {
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

        const location = 'Downtown Seattle';
        const duration = { hours: '2', minutes: '30' };
        const vibes = 'cultural,foodie';

        await getItinerary(location, duration, vibes);

        expect(fetch).toHaveBeenCalledTimes(1);
        
        const callArgs = fetch.mock.calls[0];
        const url = new URL(callArgs[0]);
        
        expect(url.origin + url.pathname).toBe(constants.GET_ITINERARY_ENDPOINT);
        expect(url.searchParams.get('location')).toBe(encodeURIComponent(location));
        expect(url.searchParams.get('hours')).toBe(encodeURIComponent(duration.hours));
        expect(url.searchParams.get('minutes')).toBe(encodeURIComponent(duration.minutes));
        expect(url.searchParams.get('vibes')).toBe(encodeURIComponent(vibes));
        
        expect(callArgs[1]).toEqual({
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
    });

    it('should handle missing duration properties', async () => {
        const mockResponse = { tourName: 'Test Tour' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const location = 'Downtown Seattle';
        const duration = {}; // Empty duration object
        const vibes = 'cultural';

        await getItinerary(location, duration, vibes);

        const callArgs = fetch.mock.calls[0];
        const url = new URL(callArgs[0]);
        
        expect(url.searchParams.get('hours')).toBe('0');
        expect(url.searchParams.get('minutes')).toBe('0');
    });

    it('should handle partial duration properties', async () => {
        const mockResponse = { tourName: 'Test Tour' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const location = 'Downtown Seattle';
        const duration = { hours: '3' }; // Missing minutes
        const vibes = 'cultural';

        await getItinerary(location, duration, vibes);

        const callArgs = fetch.mock.calls[0];
        const url = new URL(callArgs[0]);
        
        expect(url.searchParams.get('hours')).toBe('3');
        expect(url.searchParams.get('minutes')).toBe('0');
    });

    it('should return parsed response on success', async () => {
        const mockResponse = { 
            tourName: 'Seattle Cultural Tour',
            shortTourDescription: 'A walking tour of cultural sites',
            stops: [
                { stopName: 'Pike Place Market', duration: '30 minutes' },
                { stopName: 'Seattle Art Museum', duration: '45 minutes' }
            ]
        };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await getItinerary('Seattle', { hours: '2', minutes: '0' }, 'cultural');
        
        expect(result).toEqual(mockResponse);
    });

    it('should handle HTTP errors', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
        });

        const result = await getItinerary('Invalid Location', { hours: '0' }, 'invalid');
        
        expect(result).toEqual({ error: true });
    });

    it('should handle network errors', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const result = await getItinerary('Seattle', { hours: '2' }, 'cultural');
        
        expect(result).toEqual({ error: true });
    });

    it('should handle special characters in parameters', async () => {
        const mockResponse = { tourName: 'Test Tour' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const location = 'San José, Costa Rica';
        const duration = { hours: '1', minutes: '30' };
        const vibes = 'nature & wildlife';

        await getItinerary(location, duration, vibes);

        const callArgs = fetch.mock.calls[0];
        const url = new URL(callArgs[0]);
        
        expect(url.searchParams.get('location')).toBe(encodeURIComponent(location));
        expect(url.searchParams.get('vibes')).toBe(encodeURIComponent(vibes));
    });

    it('should handle JSON parsing errors', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                throw new Error('Invalid JSON');
            },
        });

        const result = await getItinerary('Seattle', { hours: '2' }, 'cultural');
        
        expect(result).toEqual({ error: true });
    });
});