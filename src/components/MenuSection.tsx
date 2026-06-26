import React from 'react';
import { menuData } from '../data/menuData';
import MenuCard from './MenuCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

const MenuSection: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.2);

  return (
    <>
      {/* Hero */}
      <section className="menu-hero" aria-labelledby="hero-title">
        <div className="hero-bg-gradient" aria-hidden="true" />
        <div className="hero-grid-overlay" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-badge" aria-label="Fine Dine Restaurant">
            <span className="hero-badge-dot" aria-hidden="true" />
            Fine Dine Restaurant
          </div>
          <h1 id="hero-title" className="hero-title">
            NMR'S{' '}
            <span className="hero-title-accent">UPTOWN</span>
          </h1>
          <p className="hero-subtitle">
            An exquisite culinary journey through the finest Indian rice and biriyani — crafted with tradition, served with elegance.
          </p>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-text">Scroll to explore</span>
        </div>
      </section>

      {/* Menu */}
      <section
        id="menu-section"
        aria-labelledby="menu-title"
        style={{ background: 'var(--bg-surface)' }}
      >
        {menuData.map((category) => (
          <div key={category.id} className="menu-section">
            {/* Category header */}
            <div
              ref={headerRef}
              className={`menu-section-header reveal-section ${headerVisible ? 'visible' : ''}`}
            >
              <div className="menu-category-badge" aria-label="Menu category">
                ✦ Menu
              </div>
              <h2 id="menu-title" className="menu-section-title">
                {category.name}
              </h2>
              <div className="menu-section-divider" aria-hidden="true" />
            </div>

            {/* Items grid */}
            <div
              className="menu-grid"
              role="list"
              aria-label={`${category.name} menu items`}
            >
              {category.items.map((item, index) => (
                <div key={item.id} role="listitem">
                  <MenuCard item={item} index={index} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default MenuSection;
