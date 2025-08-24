import constants from './constants';

describe('constants', () => {
    it('should have all required API endpoints', () => {
        expect(constants).toHaveProperty('GET_ITINERARY_ENDPOINT');
        expect(constants).toHaveProperty('ASK_QUESTION_ENDPOINT');
        expect(constants).toHaveProperty('GET_PHOTO_ENDPOINT');
        expect(constants).toHaveProperty('GET_TOUR_ENDPOINT');
        expect(constants).toHaveProperty('SHARE_FEEDBACK_ENDPOINT');
    });

    it('should use production environment by default', () => {
        const prodBase = 'https://mz30hoge6l.execute-api.us-east-1.amazonaws.com';
        
        expect(constants.GET_ITINERARY_ENDPOINT).toBe(`${prodBase}/get-itinerary`);
        expect(constants.ASK_QUESTION_ENDPOINT).toBe(`${prodBase}/ask-question`);
        expect(constants.GET_PHOTO_ENDPOINT).toBe(`${prodBase}/get-place-photo`);
        expect(constants.GET_TOUR_ENDPOINT).toBe(`${prodBase}/get-existing-tour`);
        expect(constants.SHARE_FEEDBACK_ENDPOINT).toBe(`${prodBase}/share-feedback`);
    });

    it('should have valid URL endpoints', () => {
        Object.values(constants).forEach(endpoint => {
            expect(() => new URL(endpoint)).not.toThrow();
        });
    });
});