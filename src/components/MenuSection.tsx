import React from 'react';
import { menuData } from '../data/menuData';
import MenuCard from './MenuCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface MenuSectionProps {
  onCartOpen: () => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ onCartOpen }) => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.15);

  return (
    <section id="menu-section" aria-labelledby="menu-title">
      {menuData.map((category) => (
        <div key={category.id} className="menu-section">
          <div
            ref={headerRef}
            className={`menu-section-head reveal-section${headerVisible ? ' visible' : ''}`}
          >
            <div className="menu-section-label">Our Specialities</div>
            <h1 id="menu-title" className="menu-section-title">{category.name}</h1>
            <p className="menu-section-hint">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M1 4v6h6M23 20v-6h-6" />
              </svg>
              Tap any card to reveal ingredients
            </p>
          </div>

          <div
            className="menu-grid"
            role="list"
            aria-label={`${category.name} menu items`}
          >
            {category.items.map((item, idx) => (
              <div key={item.id} role="listitem">
                <MenuCard item={item} index={idx} onCartOpen={onCartOpen} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default MenuSection;
