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
            <a className='heroCTA button'href="https://mailchi.mp/1b524f0a113a/local-loop-beta-program" target='_blank' rel='noreferrer noopener'>Learn about our Beta Program</a>
        </div>
        <div>
            <img className="hero" src="./hero.png" alt="local loop tour"/>
        </div>
    </section>
  );
}

export default HomeSection;