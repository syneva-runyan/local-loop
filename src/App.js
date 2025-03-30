// src/App.js
import React from 'react';
import './fonts.css';
import './App.css';
import HomeSection from './components/HomeSection';
import FeaturesSection from './components/FeaturesSection';
import VisitorExample from './components/VisitorExample';
import BusinessIncentiveSection from './components/BusinessIncentive';
import KeepInTheLoop from './components/KeepInTheLoop';
import Footer from './components/Footer'
import WhatIsLocalLoop from './components/WhatIsLocalLoop';


function App() {
  return (
    <div className="App">
        <HomeSection />
        <WhatIsLocalLoop />
        <FeaturesSection />
        <VisitorExample />
        <BusinessIncentiveSection />
        <KeepInTheLoop />
      <Footer />
    </div>
  );
}

export default App;