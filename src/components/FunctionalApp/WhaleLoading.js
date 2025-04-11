import React from 'react';
import './WhaleLoading.css';

const MapLoading = () => {
  return (
    <div className="map-loading-container">
      <div className="map-grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <div className={`map-tile delay-${i}`} key={i}></div>
        ))}
      </div>
      <p className="loading-text">Crafting your tour…</p>
    </div>
  );
};

export default MapLoading;
