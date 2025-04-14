import { useState, useEffect } from 'react';
import './ItineraryLoading.css';
import funFacts from '../../data/funFacts';
import FadeIn from './utilComponents/FadeIn';

const MapLoading = ({ location }) => {
  const [funFactIdx, setFunFactIdx] = useState(0);

  const facts = funFacts[location];
  
  useEffect(() => {
    const factTimer = setTimeout(() => {
      const updatedIdx = (funFactIdx + 1) % facts.length;
      setFunFactIdx(updatedIdx);
    }, 5000)

    return () => {
      clearTimeout(factTimer);
    }
  }, [funFactIdx, facts])
  return (
    <div className="map-loading-container">
      <div className="map-grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <div className={`map-tile delay-${i}`} key={i}></div>
        ))}
      </div>
      <p className="loading-text">Crafting your tour</p>
      <div className='itineraryLoadingFunFact'>
        {
          facts.map((fact, factIdx) => {
            if(factIdx === funFactIdx) {
              return (
                <FadeIn key={`fact-${factIdx}`} fadeTimer={75}>
                  <p>{fact}</p>
                </FadeIn>
              )
            }
            return null;
          })
        }
      </div>
    </div>
  );
};

export default MapLoading;
