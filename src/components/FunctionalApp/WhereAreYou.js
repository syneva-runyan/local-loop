import { useState } from "react";
import { faLocation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './WhereAreYou.css';
import funFacts from "../../data/funFacts";

function WhereAreYou({ setTourLocation, tourLocation}) {
    const [ shownOnlyLimitedLocationsMessage, setShowOnlyLimitedLocationsMessage] = useState(false);
    const changeLocation = (e) => {
        setTourLocation(e.target.value);
        setShowOnlyLimitedLocationsMessage(true)
    }
    return (
        <div className='tourInputSection'>
            <label htmlFor="whereAreYou" className='whereAreYouLabel primaryQuestion'>Where are you?</label>
            <div className='whereAreYou'>
                <FontAwesomeIcon icon={faLocation} className='whereAreYouIcon' />
                <select value={tourLocation} className="whereAreYouInput" id="whereAreYou" name="location" onChange={changeLocation}>
                    {
                        Object.keys(funFacts).map((key, index) => {
                            return (
                                <option key={index} value={key}>{key}</option>
                            )
                        })
                    }
                </select>
            </div>
            {shownOnlyLimitedLocationsMessage && <p className="onlyJuneau"><em>Right now locations other than Juneau are experimental. <a href="mailTo:syneva@localloopcommunity.com" target='_blank' rel='noreferrer noopener'>Contact us</a> with any feedback!</em></p>}
        </div>
    );
}

export default WhereAreYou;
