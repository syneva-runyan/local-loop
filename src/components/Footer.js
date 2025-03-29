// src/components/Footer.js
import './Footer.css';
import React from 'react';

function Footer() {
  return (
    <section className="footer">
      <p className='footerText'>© Local Loop LLC, {new Date().getFullYear()}</p>
      <p className='footerText'>Questions or suggestions? Contact <a href="mailTo:localloop907@gmail.com" target='_blank' rel='noreferrer noopener'>localloop907@gmail.com</a></p>
    </section>
  );
}

export default Footer;