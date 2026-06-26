import React from 'react';
import type { MenuItem } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, index }) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  const delay = (index % 4) * 80;

  return (
    <article
      ref={ref}
      id={`menu-item-${item.id}`}
      className={`menu-card reveal-ready ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      aria-label={`${item.name} - ₹${item.price}`}
    >
      {/* Video slot — premium animated placeholder (video-ready) */}
      {item.videoUrl ? (
        <div className="menu-card-video-wrapper">
          <video
            src={item.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
          />
        </div>
      ) : (
        <div className="menu-card-video-wrapper">
          <div className="menu-card-video-placeholder">
            <div className="menu-card-video-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
            <span className="menu-card-video-label">Video coming soon</span>
          </div>
        </div>
      )}

      {/* Card content */}
      <div className="menu-card-content">
        <span className="menu-card-number">#{String(index + 1).padStart(2, '0')}</span>
        <h3 className="menu-card-name">{item.name}</h3>
        <div className="menu-card-footer">
          <p className="menu-card-price" aria-label={`Price: ${item.price} rupees`}>
            <span className="menu-card-price-symbol">₹</span>
            {item.price}
          </p>
          <div className="menu-card-action" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom shimmer line */}
      <div className="menu-card-shimmer" aria-hidden="true" />
    </article>
  );
};

export default MenuCard;
