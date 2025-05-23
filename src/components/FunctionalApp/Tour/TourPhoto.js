import './TourPhoto.css';

import constants from "../../../apiRequests/constants"

function TourPhoto({tourPhoto = {} }) {
    // calculte placeholder size
    const placeholderWidth = Math.min(window.innerWidth , 1000); // 50 = page padding;
    if (!tourPhoto.height || !tourPhoto.width) {
        return null;
    }
    const placeholderHeight = Math.round((placeholderWidth * tourPhoto.height) / tourPhoto.width);

    return (
        <div className='tourPhoto'>
            <img 
                className="tourPhotoImg fade-in-photo"
                src={`${constants.GET_PHOTO_ENDPOINT}?ref=${tourPhoto.photo_reference}`}
                alt="tour preview"
                style={{
                    minWidth: placeholderWidth,
                    minHeight: Math.min(placeholderHeight, 400)
                }}
            />
            <p className='tourPhotoCitation'><em>Photo by <span dangerouslySetInnerHTML={{__html: tourPhoto.html_attributions}} /></em></p>
        </div>
    );
}

export default TourPhoto;
