import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faPlug, faHeart } from '@fortawesome/free-solid-svg-icons'


function BusinessIncentiveSection() {
  return (
    <section id="customer-interviews">
      <h2>Participating Businesses Get..</h2>
      <ul>
        <li>
          <FontAwesomeIcon icon={faBullhorn} />
          highlighted on tours
        </li>
        <li>
          <FontAwesomeIcon icon={faPlug} />
          have a direct channel to visitors</li>
        <li>
          <FontAwesomeIcon icon={faHeart} />
          to showcase their company’s story and connection to the community
          </li>
      </ul>
    </section>
  );
}

export default BusinessIncentiveSection;