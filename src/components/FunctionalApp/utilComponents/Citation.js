function getCitationDomain(citation) {
    try {
        const url = new URL(citation);
        return {
            citation: url.hostname.replace('www.', ''),
            citationUrl: url,
            isUrl: true
        }
    } catch(e) {
        return { citation, isUrl: false };
    }
}

function Citation({ citation, isLast }) {
    const citationInfo = getCitationDomain(citation)
    if (citationInfo.isUrl) {
        return (
            <>
            <a 
                href={citationInfo.citationUrl} 
                target="_blank" rel="noopener noreferrer" 
                key={citationInfo.citation}>
                    {citationInfo.citation}
            </a>
            {isLast ? "" : ", "} 
            </>
        );
    }
    return <span key={citationInfo.citation}>{citationInfo.citation}{isLast ? "" : ", "}</span>;
}

export default Citation;