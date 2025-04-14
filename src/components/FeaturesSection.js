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
            <strong>Local businesses associations</strong> share information on businesses with Local Loop.
        </li>
        <li>
            <FontAwesomeIcon icon={faPerson} />
            <strong>Visitors</strong> provide information about their interests.
        </li>
        <li>
            <FontAwesomeIcon icon={faMapLocation} />
            <strong>Local Loop</strong> crafts a personalized, self-guided tour for the visitor, featuring the business coalition members.
        </li>
      </ul>
    </section>
  );
}

export default FeaturesSection;