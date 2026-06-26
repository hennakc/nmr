import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`} role="banner">
      <img
        src="/logo.png"
        alt="NMR's UPTOWN Fine Dine Restaurant"
        className="header-logo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      <nav className="header-nav" role="navigation" aria-label="Main navigation">
        <button
          id="nav-menu"
          className="nav-link"
          onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Menu
        </button>

        {/* Cart button */}
        <button
          id="nav-cart-btn"
          className="nav-cart-btn"
          onClick={onCartOpen}
          aria-label={`Open cart — ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {totalItems > 0 && (
            <span className="cart-badge" aria-hidden="true">{totalItems}</span>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;
