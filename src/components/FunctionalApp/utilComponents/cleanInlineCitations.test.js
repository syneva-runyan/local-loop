import cleanInlineCitations from './cleanInlineCitations';

describe('cleanInlineCitations', () => {
    it('should remove single citation numbers in brackets', () => {
        const input = 'This is some text [1] with citations.';
        const expected = 'This is some text with citations.';
        expect(cleanInlineCitations(input)).toBe(expected);
    });

    it('should remove multiple citation numbers in brackets', () => {
        const input = 'Text with [1, 2, 3] multiple citations.';
        const expected = 'Text with multiple citations.';
        expect(cleanInlineCitations(input)).toBe(expected);
    });

    it('should remove citations with spaces around numbers', () => {
        const input = 'Text [ 1 , 2 ] with spaced citations.';
        const expected = 'Text with spaced citations.';
        expect(cleanInlineCitations(input)).toBe(expected);
    });

    it('should handle multiple separate citations', () => {
        const input = 'First [1] and second [2] citations.';
        const expected = 'First and second citations.';
        expect(cleanInlineCitations(input)).toBe(expected);
    });

    it('should handle empty string', () => {
        expect(cleanInlineCitations('')).toBe('');
    });

    it('should handle null input', () => {
        expect(cleanInlineCitations(null)).toBe('');
    });

    it('should handle undefined input', () => {
        expect(cleanInlineCitations(undefined)).toBe('');
    });

    it('should handle non-string input', () => {
        expect(cleanInlineCitations(123)).toBe(123);
        expect(cleanInlineCitations({})).toStrictEqual({});
    });

    it('should not affect text without citations', () => {
        const input = 'Regular text without any citations.';
        expect(cleanInlineCitations(input)).toBe(input);
    });

    it('should handle text with brackets but no numbers', () => {
        const input = 'Text with [abc] brackets.';
        expect(cleanInlineCitations(input)).toBe(input);
    });
});