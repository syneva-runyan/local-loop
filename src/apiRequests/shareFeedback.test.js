import shareFeedback from './shareFeedback';
import constants from './constants';

// Mock fetch globally
global.fetch = jest.fn();

describe('shareFeedback', () => {
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
        const mockResponse = { success: true };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const sentiment = 'positive';
        const feedback = 'Great tour experience!';

        await shareFeedback(sentiment, feedback);

        expect(fetch).toHaveBeenCalledTimes(1);
        
        const callArgs = fetch.mock.calls[0];
        const url = new URL(callArgs[0]);
        
        expect(url.origin + url.pathname).toBe(constants.SHARE_FEEDBACK_ENDPOINT);
        expect(url.searchParams.get('sentiment')).toBe(encodeURIComponent(sentiment));
        expect(url.searchParams.get('feedback')).toBe(encodeURIComponent(feedback));
        
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
            success: true,
            message: 'Feedback received successfully'
        };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await shareFeedback('positive', 'Great experience!');
        
        expect(result).toEqual(mockResponse);
    });

    it('should handle HTTP errors', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        const result = await shareFeedback('negative', 'Something went wrong');
        
        expect(result).toEqual({ error: true });
    });

    it('should handle network errors', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const result = await shareFeedback('neutral', 'Network issues');
        
        expect(result).toEqual({ error: true });
    });

    it('should handle special characters in feedback', async () => {
        const mockResponse = { success: true };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const sentiment = 'positive';
        const feedback = 'Great café & restaurant recommendations! 5⭐';

        await shareFeedback(sentiment, feedback);

        const callArgs = fetch.mock.calls[0];
        const url = new URL(callArgs[0]);
        
        expect(url.searchParams.get('sentiment')).toBe(encodeURIComponent(sentiment));
        expect(url.searchParams.get('feedback')).toBe(encodeURIComponent(feedback));
    });

    it('should handle empty feedback', async () => {
        const mockResponse = { success: true };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await shareFeedback('neutral', '');
        
        expect(result).toEqual(mockResponse);
        
        const callArgs = fetch.mock.calls[0];
        const url = new URL(callArgs[0]);
        expect(url.searchParams.get('feedback')).toBe('');
    });

    it('should handle various sentiment values', async () => {
        const mockResponse = { success: true };
        const sentiments = ['positive', 'negative', 'neutral', 'mixed'];
        
        for (const sentiment of sentiments) {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            await shareFeedback(sentiment, 'Test feedback');

            const callArgs = fetch.mock.calls[fetch.mock.calls.length - 1];
            const url = new URL(callArgs[0]);
            expect(url.searchParams.get('sentiment')).toBe(sentiment);
        }
    });
});