import askQuestion from './askQuestion';
import constants from './constants';

// Mock fetch globally
global.fetch = jest.fn();

describe('askQuestion', () => {
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
        const mockResponse = { answer: 'Test response' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const question = 'What is this place?';
        const stopName = 'Test Stop';
        const location = 'Test Location';

        await askQuestion(question, stopName, location);

        expect(fetch).toHaveBeenCalledTimes(1);
        
        const callArgs = fetch.mock.calls[0];
        const url = new URL(callArgs[0]);
        
        expect(url.origin + url.pathname).toBe(constants.ASK_QUESTION_ENDPOINT);
        expect(url.searchParams.get('question')).toBe(encodeURIComponent(question));
        expect(url.searchParams.get('stopName')).toBe(encodeURIComponent(stopName));
        expect(url.searchParams.get('location')).toBe(encodeURIComponent(location));
        
        expect(callArgs[1]).toEqual({
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
    });

    it('should return parsed response on success', async () => {
        const mockResponse = { answer: 'Test response', success: true };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await askQuestion('test question', 'test stop', 'test location');
        
        expect(result).toEqual(mockResponse);
    });

    it('should handle HTTP errors', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        const result = await askQuestion('test question', 'test stop', 'test location');
        
        expect(result).toEqual({ error: true });
    });

    it('should handle network errors', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const result = await askQuestion('test question', 'test stop', 'test location');
        
        expect(result).toEqual({ error: true });
    });

    it('should handle special characters in parameters', async () => {
        const mockResponse = { answer: 'Test response' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const question = 'What about café & restaurant?';
        const stopName = 'Stop with "quotes"';
        const location = 'Location with spaces & symbols';

        await askQuestion(question, stopName, location);

        const callArgs = fetch.mock.calls[0];
        const url = new URL(callArgs[0]);
        
        expect(url.searchParams.get('question')).toBe(encodeURIComponent(question));
        expect(url.searchParams.get('stopName')).toBe(encodeURIComponent(stopName));
        expect(url.searchParams.get('location')).toBe(encodeURIComponent(location));
    });
});