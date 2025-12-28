// AI assisted development
import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="App">
      <LandingPage isLoaded={isLoaded} />
    </div>
  );
}

export default App;

