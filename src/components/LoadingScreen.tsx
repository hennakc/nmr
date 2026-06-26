import React, { useEffect, useState } from 'react';
import '../styles/global.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);
  const [progressText, setProgressText] = useState('Preparing your experience');

  useEffect(() => {
    const texts = [
      'Preparing your experience',
      'Curating the finest dishes',
      'Setting the table',
      'Welcome to UPTOWN',
    ];
    let idx = 0;
    const textInterval = setInterval(() => {
      idx = (idx + 1) % texts.length;
      setProgressText(texts[idx]);
    }, 700);

    const exitTimer = setTimeout(() => {
      setProgressText('Welcome to UPTOWN');
      clearInterval(textInterval);
      setTimeout(() => {
        setExiting(true);
        setTimeout(onComplete, 800);
      }, 400);
    }, 2800);

    return () => {
      clearInterval(textInterval);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen ${exiting ? 'exiting' : ''}`} role="status" aria-label="Loading NMR's Uptown">
      {/* Ambient orbs */}
      <div className="loading-bg-orbs">
        <div className="loading-orb loading-orb-1" />
        <div className="loading-orb loading-orb-2" />
        <div className="loading-orb loading-orb-3" />
      </div>

      <div className="loading-content">
        {/* Logo */}
        <div className="loading-logo-wrapper">
          <div className="loading-logo-ring" />
          <div className="loading-logo-img-container">
            <img
              src="/logo.png"
              alt="NMR's UPTOWN Fine Dine Restaurant"
              draggable={false}
            />
          </div>
        </div>

        <div className="loading-divider" />

        {/* Progress */}
        <div className="loading-progress-wrapper">
          <div className="loading-progress-track">
            <div className="loading-progress-bar" />
          </div>
          <span className="loading-progress-text">{progressText}</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
