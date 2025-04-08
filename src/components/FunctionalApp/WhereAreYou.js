import { useState } from "react";
import { faLocation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './WhereAreYou.css';

function WhereAreYou() {
    const [ shownOnlyJuneauMessage, setShowOnlyJuneauMessage] = useState(false);
    return (
        <div className='tourInputSection'>
            <label htmlFor="whereAreYou" className='whereAreYouLabel primaryQuestion'>Where are you?</label>
            <div className='whereAreYou'>
                <FontAwesomeIcon icon={faLocation} className='whereAreYouIcon' />
                <input value="Juneau, Alaska" className="whereAreYouInput" id="whereAreYou" name="location" onChange={() => setShowOnlyJuneauMessage(true)} />
            </div>
            {shownOnlyJuneauMessage && <p className="onlyJuneau"><em>Right now we only support Juneau, Alaska. <a href="mailTo:syneva@localloopcommunity.com" target='_blank' rel='noreferrer noopener'>Contact us</a> to request a location!</em></p>}
        </div>
    );
}

export default WhereAreYou;