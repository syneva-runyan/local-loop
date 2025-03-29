import './Header.css';

// src/components/HomeSection.js
import React from 'react';

function HomeSection() {
  return (
    <header className='header'>
      <img src="./LocalLoopLogo.png" alt="local loop logo" className='logo'/>
      <h1 className="headerTitle">Local Loop</h1>
    </header>
  );
}

export default HomeSection;