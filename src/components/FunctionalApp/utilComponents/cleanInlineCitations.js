export default function cleanInlineCitations(text) {
    return text.replace(/\s*\[\s*\d+\s*(\s*,\s*\d+\s*)*\]/g, '');
}