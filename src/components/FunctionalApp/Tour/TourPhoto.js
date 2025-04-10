import './TourPhoto.css';

import constants from "../../../apiRequests/constants"

function TourPhoto({tourPhoto }) {
    return (
        <div className='tourPhoto'>
            {/* <img className="tourPhotoImg" src={`${constants.GET_PHOTO_ENDPOINT}?ref=${tourPhoto.photo_reference}`} alt="tour"/> */}
            <img className="tourPhotoImg" src="https://alicesadventuresonearth.com/wp-content/uploads/IMG_7787-scaled.jpg" alt="tour"/>
            <p className='tourPhotoCitation'><em>Photo by <span dangerouslySetInnerHTML={{__html: tourPhoto.html_attributions}} /></em></p>
        </div>
    );
}

export default TourPhoto;
