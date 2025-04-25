// src/App.js
import React from 'react';
import './fonts.css';
import './App.css';
import HomeSection from './components/HomeSection';
import FeaturesSection from './components/FeaturesSection';
import VisitorExample from './components/VisitorExample';
import KeepInTheLoop from './components/KeepInTheLoop';
import Footer from './components/Footer'
import WhatIsLocalLoop from './components/WhatIsLocalLoop';
import CustomerDiscovery from './components/CustomerDiscovery';
import { Routes, Route } from "react-router";
import FunctionalApp from './components/FunctionalApp/FunctionalApp';

function HomePage() {
  return (
    <>
      <HomeSection />
      <WhatIsLocalLoop />
      <FeaturesSection />
      <VisitorExample />
      <CustomerDiscovery />
      <KeepInTheLoop />
    </>
  )
}


function App() {
  return (
    <div className="App">
        <Routes>
          <Route index  element={<HomePage />} />
          <Route path="/app" element={<FunctionalApp />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;