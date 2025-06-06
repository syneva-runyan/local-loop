// src/components/FeaturesSection.js
import './FeaturesSection.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faMapLocation } from '@fortawesome/free-solid-svg-icons'


function FeaturesSection() {
  return (
    <section id="features">
      <h2>How it Works</h2>
      <ul className="featuresList">
        <li>
            <FontAwesomeIcon icon={faPerson} />
            <strong>Travelers</strong> provide information about their interests.
        </li>
        <li>
            <FontAwesomeIcon icon={faMapLocation} />
            <strong>Local Loop</strong> crafts a personalized, self-guided tour, featuring local businesses.
        </li>
      </ul>
    </section>
  );
}

export default FeaturesSection;