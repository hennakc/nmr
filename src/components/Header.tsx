import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} role="banner">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="NMR's UPTOWN Fine Dine Restaurant"
        className="header-logo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Nav */}
      <nav className="header-nav" role="navigation" aria-label="Main navigation">
        <button
          id="nav-menu"
          className="nav-link"
          onClick={() => scrollTo('menu-section')}
          aria-label="Navigate to menu"
        >
          Menu
        </button>
        <button
          id="nav-blog"
          className="nav-link"
          onClick={() => scrollTo('blog-section')}
          aria-label="Navigate to blog"
        >
          Blog
        </button>
        <button
          id="nav-order"
          className="nav-link nav-link-cta"
          onClick={() => scrollTo('menu-section')}
          aria-label="View our menu"
        >
          View Menu
        </button>
      </nav>
    </header>
  );
};

export default Header;
