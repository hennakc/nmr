import React, { useEffect, useRef, useState } from 'react';
import '../styles/global.css';

interface IntroVideoProps {
  src: string;
  onComplete: () => void;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ src, onComplete }) => {
  const videoBgRef = useRef<HTMLVideoElement>(null);
  const videoFgRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);
  const [showUnmuteHint, setShowUnmuteHint] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const videoBg = videoBgRef.current;
    const videoFg = videoFgRef.current;
    if (!videoBg || !videoFg) return;

    // Attempt autoplay with sound
    const playPromise = videoFg.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          videoBg.play().catch(() => {});
        })
        .catch((error) => {
          console.log("Autoplay with sound blocked, trying muted...", error);
          // Try muted autoplay
          videoFg.muted = true;
          setIsMuted(true);
          
          const mutedPlayPromise = videoFg.play();
          if (mutedPlayPromise !== undefined) {
            mutedPlayPromise
              .then(() => {
                setIsPlaying(true);
                setShowUnmuteHint(true);
                videoBg.play().catch(() => {});
              })
              .catch((mutedError) => {
                console.log("Muted autoplay blocked, showing play overlay", mutedError);
                setShowPlayOverlay(true);
              });
          }
        });
    }
  }, []);

  const handlePlayClick = () => {
    const videoBg = videoBgRef.current;
    const videoFg = videoFgRef.current;
    if (!videoBg || !videoFg) return;
    
    videoFg.muted = false;
    setIsMuted(false);
    setShowPlayOverlay(false);
    setShowUnmuteHint(false);
    
    videoFg.play()
      .then(() => {
        setIsPlaying(true);
        videoBg.play().catch(() => {});
      })
      .catch((err) => {
        console.error("Playback failed after interaction:", err);
      });
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const videoFg = videoFgRef.current;
    if (!videoFg) return;
    
    const newMuted = !videoFg.muted;
    videoFg.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted) {
      setShowUnmuteHint(false);
    }
  };

  const triggerExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    videoBgRef.current?.pause();
    videoFgRef.current?.pause();
    // Allow fadeout animation to complete
    setTimeout(onComplete, 800);
  };

  return (
    <div className={`intro-container ${isExiting ? 'intro-exit' : ''}`}>
      {/* Ambient Blurred Background Video to fill the empty space on phone screens */}
      <video
        ref={videoBgRef}
        src={src}
        className="intro-video-bg"
        playsInline
        muted
        loop
        aria-hidden="true"
      />

      {/* High-Contrast Foreground Video showing 100% of the content */}
      <video
        ref={videoFgRef}
        src={src}
        className="intro-video-fg"
        playsInline
        onEnded={triggerExit}
      />

      {/* Elegant Play Overlay for blocked autoplay */}
      {showPlayOverlay && (
        <div className="intro-overlay" onClick={handlePlayClick}>
          <div className="intro-play-card">
            <div className="intro-play-icon-wrap">
              <svg className="intro-play-icon" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            </div>
            <span className="intro-play-text">Enter Experience</span>
          </div>
        </div>
      )}

      {/* Floating Unmute Hint if playing muted */}
      {showUnmuteHint && isPlaying && !showPlayOverlay && (
        <button className="intro-unmute-hint" onClick={handleMuteToggle}>
          <svg className="intro-hint-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M23 9l-6 6M17 9l6 6" />
          </svg>
          <span>Tap to Unmute</span>
        </button>
      )}

      {/* Premium Controls */}
      {isPlaying && !showPlayOverlay && (
        <>
          {/* Mute/Unmute Button */}
          <button 
            className="intro-control-btn intro-mute-btn" 
            onClick={handleMuteToggle}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>

          {/* Skip Button */}
          <button 
            className="intro-control-btn intro-skip-btn" 
            onClick={triggerExit}
            aria-label="Skip intro video"
          >
            <span>Skip Intro</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="skip-arrow">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default IntroVideo;
