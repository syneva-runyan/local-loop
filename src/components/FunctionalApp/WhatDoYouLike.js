import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import vibes from '../../data/vibes';
import './WhatDoYouLike.css';

function WhatDoYouLike() {
    const [vibesState, setVibesState] = useState([...vibes.map(vibe => ({
        ...vibe,
        selected: false,
    }))]);

    const toggleVibe = (e, vibeIdx) => {
        e.preventDefault();
        const updatedValue = !vibesState[vibeIdx].selected;
        const clonedVibes = [...vibesState];
        clonedVibes[vibeIdx].selected = updatedValue;
        console.log(updatedValue);
        setVibesState([...clonedVibes]);
    }
    return (
        <div className='tourInputSection'>
        <label className='primaryQuestion whatDoYouLikeLabel'>What are you intersted in?</label>
        <div className='vibes'>
            {vibesState.map((vibe, vibeIdx) => {
                return (
                    <button key={vibe.vibeName} className={`vibe ${vibe.selected ? "selected" : ''}`} onClick={(e) => toggleVibe(e, vibeIdx)}>
                        <FontAwesomeIcon icon={vibe.icon} style={{"color": `${vibe.color}` }} className='vibeIcon'/>
                        <p><strong>{vibe.vibeName}</strong></p>
                    </button>
                )
            })}
        </div>
        </div>
    )
}

export default WhatDoYouLike;