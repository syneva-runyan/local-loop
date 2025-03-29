// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <section>
      <p>© Local Loop LLC, {new Date().getFullYear()}</p>
      <p>Questions or suggestions? Contact <a href="mailTo:localloop907@gmail.com" target='_blank' rel='noreferrer noopener'>localloop907@gmail.com</a></p>
    </section>
  );
}

export default Footer;