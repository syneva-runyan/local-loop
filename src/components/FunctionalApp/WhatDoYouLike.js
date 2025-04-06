import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import vibes from '../../data/vibes';
import './WhatDoYouLike.css';

function WhatDoYouLike() {
    const [selectedVibesIdx, setSelectedVibesIdx] = useState([...Array(vibes.length).keys().map(() => false)]);

    const toggleVibe = (vibeIdx) => {
        const updatedValue = !selectedVibesIdx[vibeIdx];
        selectedVibesIdx[vibeIdx] = updatedValue;
        setSelectedVibesIdx([...selectedVibesIdx]);
    }
    return (
        <div className='tourInputSection'>
        <label className='primaryQuestion'>What are you intersted in?</label>
        <ul className='vibes'>
            {vibes.map((vibe, vibeIdx) => {
                return (
                    <li key={vibe.vibeName} className={`vibe ${selectedVibesIdx[vibeIdx] && "selected"}`} onClick={() => toggleVibe(vibeIdx)}>
                        <FontAwesomeIcon icon={vibe.icon} style={{"color": `${vibe.color}` }} className='vibeIcon'/>
                        <p><strong>{vibe.vibeName}</strong></p>
                    </li>
                )
            })}
        </ul>
        </div>
    )
}

export default WhatDoYouLike;