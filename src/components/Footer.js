// src/components/Footer.js
import './Footer.css';
import React from 'react';

function Footer() {
  return (
    <section className="footer">
      <p className='footerText'>© Local Loop LLC, {new Date().getFullYear()}</p>
      <p className='footerText'>Questions or suggestions? Contact us via <a href="mailTo:syneva@localloopcommunity.com" target='_blank' rel='noreferrer noopener'>email</a></p>
    </section>
  );
}

export default Footer;