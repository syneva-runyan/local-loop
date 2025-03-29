// src/components/FeaturesSection.js
import './FeaturesSection.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPerson, faMapLocation } from '@fortawesome/free-solid-svg-icons'


function FeaturesSection() {
  return (
    <section id="features">
      <h2>How it Works</h2>
      <ul className="featuresList">
        <li>
            <FontAwesomeIcon icon={faBriefcase} />
            <strong>Local businesses</strong> provide information and history on their company.
        </li>
        <li>
            <FontAwesomeIcon icon={faPerson} />
            <strong>Visitors</strong> let Local Loop know what they want to get out of their visit. 
        </li>
        <li>
            <FontAwesomeIcon icon={faMapLocation} />
            <strong>Local Loop</strong> crafts a personalized, self-guided tour for the visitor, featuring the local community.
        </li>
      </ul>
    </section>
  );
}

export default FeaturesSection;