import React, { useEffect, useState } from 'react';
import './FadeIn.css';

const FadeIn = ({ children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in after mount
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`fade-in ${visible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

export default FadeIn;
