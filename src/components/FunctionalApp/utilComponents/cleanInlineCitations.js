export default function cleanInlineCitations(text) {
    if (!text || typeof text !== 'string') {
        return text || '';
    }
    return text.replace(/\s*\[\s*\d+\s*(\s*,\s*\d+\s*)*\]/g, '');
}