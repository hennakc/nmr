import React, { useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  showHoverEffects?: boolean;
}

const PlayIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  className = '',
  style = {},
  showHoverEffects = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className={`blog-card-video-wrapper ${className}`}
      style={style}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {showHoverEffects && (
        <>
          {/* Dark overlay */}
          <div className="blog-card-overlay" aria-hidden="true" />

          {/* Centered play button */}
          <div className="blog-card-play-icon" aria-hidden="true">
            <PlayIcon />
          </div>

          {/* L-shaped corner brackets */}
          <div className="blog-card-corner blog-card-corner-tl" aria-hidden="true" />
          <div className="blog-card-corner blog-card-corner-tr" aria-hidden="true" />
          <div className="blog-card-corner blog-card-corner-bl" aria-hidden="true" />
          <div className="blog-card-corner blog-card-corner-br" aria-hidden="true" />
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
