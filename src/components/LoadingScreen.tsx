import React, { useEffect, useState } from 'react';
import '../styles/global.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

const STATUSES = [
  'Setting the table for you…',
  'Curating the finest dishes…',
  'Warming up the kitchen…',
  'Almost ready to serve…',
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((i) => (i + 1) % STATUSES.length);
    }, 700);

    const exit = setTimeout(() => {
      clearInterval(interval);
      setExiting(true);
      setTimeout(onComplete, 650);
    }, 2900);

    return () => {
      clearInterval(interval);
      clearTimeout(exit);
    };
  }, [onComplete]);

  return (
    <div
      className={`loading-screen${exiting ? ' exiting' : ''}`}
      role="status"
      aria-label="Loading NMR's Uptown"
    >
      <div className="loading-content">
        {/* Apple-Style Centered Logo with Spinner */}
        <div className="loading-apple-wrap">
          <svg className="loading-apple-spinner" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="2.5"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#F5F0EA"
              strokeWidth="2.5"
              strokeDasharray="70 200"
              strokeLinecap="round"
              fill="none"
              className="spinner-arc"
            />
          </svg>
          <img
            src="/logo.png"
            alt="NMR's UPTOWN Fine Dine Restaurant"
            className="loading-apple-logo"
            draggable={false}
          />
        </div>

        {/* Dynamic cute loading status */}
        <div className="loading-status-wrap">
          <span className="loading-status-text" aria-live="polite">
            {STATUSES[statusIdx]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
