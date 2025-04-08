import { useState } from 'react';
import './HowMuchTimeDoYouHave.css';

function HowMuchTimeDoYouHave() {
    const [hours, setHours] = useState(2)
    const [ minutes, setMinutes] = useState(30);

    const validateAndSetHours = (e) => {
        const updatedValue = e.target.value;
        if (updatedValue > 12 || updatedValue < 0) {
            return;
        }

        setHours(updatedValue);
    }

    const validateAndSetMinutes = (e) => {
        const updatedValue = e.target.value;
        if (updatedValue > 59 || updatedValue < 0) {
            return;
        }

        setMinutes(updatedValue);
    }
    return (
        <div className="tourInputSection howMuchTimeDoYouHave">
            <p className="howMuchTimeDoYouHaveQuestion primaryQuestion">How long are you in town for?</p>
            <div className='howMuchTimeDoYouHaveInputs'>
                <div className="durationInput">
                    <input type="number" id="hours" name="hours" value={hours} onChange={validateAndSetHours} />
                    <label htmlFor="hours">Hours</label>
                </div>

                <div className="durationInput">
                    <input type="number" id="minutes" value={minutes} onChange={validateAndSetMinutes} />
                    <label htmlFor="minutes">Minutes</label>
                </div>
            </div>
        </div>
    )
}

export default HowMuchTimeDoYouHave;