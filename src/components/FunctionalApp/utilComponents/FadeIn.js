import React, { useEffect, useState } from 'react';
import './FadeIn.css';

const FadeIn = ({ children, fadeTimer = 10 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in after mount
    const timeout = setTimeout(() => setVisible(true), fadeTimer);
    return () => clearTimeout(timeout);
  }, [fadeTimer]);

  return (
    <div className={`fade-in ${visible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

export default FadeIn;
