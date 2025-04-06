import WhatDoYouLike from './WhatDoYouLike';
import WhereAreYou from './WhereAreYou';
import HowMuchTimeDoYouHave from './HowMuchTImeDoYouHave';
import Header from '../Header';

import './FunctionalApp.css';

function FunctionalApp() {
    return (
      <div className='FunctionalApp'>
        <Header />
        <form className='tourInput'>
            <WhereAreYou />
            <HowMuchTimeDoYouHave />
            <WhatDoYouLike />
            <button>Build an Itinerary</button>
        </form>
    </div>
    )
}

export default FunctionalApp;