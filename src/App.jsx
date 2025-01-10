import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import LoadingScreen from './components/LoadingScreen';
import ChatInterface from './components/ChatInterface';
import TokenStats from './components/TokenStats';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Cleanup function for audio
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleStart = () => {
    setHasInteracted(true);
    // Start music
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.play().catch((err) => console.log(err));
  };

  function onLoad() {
    // Mark the Spline scene as fully loaded
    setIsSplineLoaded(true);
  }

  // Hide the loading screen only if the Spline is loaded AND the user has clicked the button.
  useEffect(() => {
    if (isSplineLoaded && hasInteracted) {
      setIsLoading(false);
    }
  }, [isSplineLoaded, hasInteracted]);

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: 'url(/back.png)', zIndex: 0 }}
      />

      {/* Show loading screen if still loading */}
      {isLoading && (
        <LoadingScreen 
          onStartClick={handleStart} 
          isSplineLoaded={isSplineLoaded} 
        />
      )}

      {/* Spline scene + Chat + Stats */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <Spline
          scene="https://prod.spline.design/FpJVDSZD2bTr3nJ0/scene.splinecode"
          onLoad={onLoad}
        />
        <ChatInterface />
        <TokenStats />
      </div>

      {/* Main Title */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-8">
        <div className="text-white text-center">
          <h1 className="text-8xl font-bold mb-4">Book of AI</h1>
          <p className="text-2xl">Unlock the secrets of artificial intelligence</p>
        </div>
      </div>
    </div>
  );
}

export default App;
