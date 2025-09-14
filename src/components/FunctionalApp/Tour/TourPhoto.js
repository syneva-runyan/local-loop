import './TourPhoto.css';
import placePhotos from '../../../data/placePhotos';

import constants from "../../../apiRequests/constants"

function TourPhoto({tourPhoto = {}, location }) {
    // default to google photo
    let photo = `${constants.GET_PHOTO_ENDPOINT}?ref=${tourPhoto.photo_reference}`;
    let isGooglePhoto = true;
    let width = tourPhoto.width;
    let height = tourPhoto.height;

    if (location in placePhotos) {
        // prefer local photo if available.
        const photoInfo = placePhotos[location];
        const randomSelection = Math.round(Math.random()*photoInfo.photoCount);
        photo = `./images/${photoInfo.photoPrefix}${randomSelection}.jpg`;
        isGooglePhoto = false;
        width = 1500;
        height = 1000;
    }
    const placeholderWidth = Math.min(window.innerWidth , 1000); // 50 = page padding;
    if (!height || !width) {
        return null;
    }
    const placeholderHeight = Math.round((placeholderWidth * height) / width);
    return (
        <div className='tourPhoto'>
            <img 
                className="tourPhotoImg fade-in-photo"
                src={photo}
                alt="tour preview"
                style={{
                    minWidth: placeholderWidth,
                    minHeight: Math.min(placeholderHeight, 400)
                }}
            />
            { isGooglePhoto && <p className='tourPhotoCitation'><em>Photo by <span dangerouslySetInnerHTML={{__html: tourPhoto.html_attributions}} /></em></p>}
        </div>
    );
}

export default TourPhoto;
