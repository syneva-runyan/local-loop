import WhatDoYouLike from './WhatDoYouLike';
import WhereAreYou from './WhereAreYou';
import HowMuchTimeDoYouHave from './HowMuchTImeDoYouHave';
import Header from '../Header';

import './FunctionalApp.css';

function FunctionalApp() {

    const onSubmit=(e) => {
        e.preventDefault();
        console.log(e.target.elements.location.value)
        console.log(e.target.elements.hours)
        console.log(e.target.elements.vibes)
    }

    return (
      <div className='FunctionalApp'>
        <Header />
        <form className='tourInput' onSubmit={onSubmit}>
            <WhereAreYou />
            <HowMuchTimeDoYouHave />
            <WhatDoYouLike />
            <button className='button' type="submit">Build an Itinerary</button>
        </form>
    </div>
    )
}

export default FunctionalApp;