import { cleanName, getFallbackLocation } from './TourStop';

// Note: These are utility functions from TourStop that can be tested independently
// We're importing them individually to test their logic without rendering the full component

describe('TourStop utility functions', () => {
    describe('cleanName', () => {
        it('should remove special characters except dots, dashes, underscores, and spaces', () => {
            const input = 'Test@Name#With$Symbols%';
            const expected = 'TestNameWithSymbols';
            expect(cleanName(input)).toBe(expected);
        });

        it('should preserve dots, dashes, underscores, spaces, and tildes', () => {
            const input = 'Valid-Name_With.Dots ~Spaces';
            expect(cleanName(input)).toBe(input);
        });

        it('should handle null input', () => {
            expect(cleanName(null)).toBe(null);
        });

        it('should handle undefined input', () => {
            expect(cleanName(undefined)).toBe(null);
        });

        it('should handle empty string', () => {
            expect(cleanName('')).toBe(null);
        });

        it('should preserve alphanumeric characters', () => {
            const input = 'Test123Name456';
            expect(cleanName(input)).toBe(input);
        });
    });

    describe('getFallbackLocation', () => {
        it('should return cleaned previous stop name when available', () => {
            const previousStop = 'Previous@Stop#Name';
            const tourLocation = 'Tour Location';
            const result = getFallbackLocation(previousStop, tourLocation);
            expect(decodeURIComponent(result)).toBe('PreviousStopName');
        });

        it('should return tour location when previous stop is null', () => {
            const previousStop = null;
            const tourLocation = 'Tour Location';
            const result = getFallbackLocation(previousStop, tourLocation);
            expect(decodeURIComponent(result)).toBe(tourLocation);
        });

        it('should return tour location when previous stop is undefined', () => {
            const previousStop = undefined;
            const tourLocation = 'Tour Location';
            const result = getFallbackLocation(previousStop, tourLocation);
            expect(decodeURIComponent(result)).toBe(tourLocation);
        });

        it('should return tour location when previous stop is empty string', () => {
            const previousStop = '';
            const tourLocation = 'Tour Location';
            const result = getFallbackLocation(previousStop, tourLocation);
            expect(decodeURIComponent(result)).toBe(tourLocation);
        });

        it('should encode the result properly', () => {
            const previousStop = 'Stop With Spaces';
            const tourLocation = 'Tour Location';
            const result = getFallbackLocation(previousStop, tourLocation);
            expect(result).toBe(encodeURIComponent('Stop With Spaces'));
        });
    });
});