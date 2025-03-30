import './HomeSection.css';
import Header from './Header';

// src/components/HomeSection.js
import React from 'react';

function HomeSection() {
  return (
    <section id="home" className='home'>
        <div className="mainTextDiv">
            <Header />
            <p className='heroTitle'>Help visitors
                <br/>
            <span>Embrace Local</span></p>
            <a  className="heroCTA button" href="http://eepurl.com/jbh9YQ" target='_blank' rel="noreferrer noopener">Keep in the Loop</a>
        </div>
        <div>
            <img className="hero" src="./hero.png" alt="local loop tour"/>
        </div>
    </section>
  );
}

export default HomeSection;