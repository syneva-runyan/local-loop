import './Header.css';
import React from 'react';

function Header() {
  return (
    <header className='header'>
        <img src="./LocalLoopLogo.png" alt="local loop logo" className='logo'/>
        <h1 className="headerTitle">Local Loop</h1>
    </header>
  );
}

export default Header;