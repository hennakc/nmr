import React, { useCallback, useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import IntroVideo from './components/IntroVideo';
import Header from './components/Header';
import MenuSection from './components/MenuSection';
import CartDrawer from './components/CartDrawer';
import LuckyDraw from './components/LuckyDraw';
import './styles/global.css';

const AppInner: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [luckyDrawOpen, setLuckyDrawOpen] = useState(false);
  const { totalItems } = useCart();

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  return (
    <>
      {showIntro && (
        <IntroVideo src="/intro.mp4" onComplete={handleIntroComplete} />
      )}

      {!showIntro && (
        <div className={`app-root${cartOpen ? ' cart-open' : ''}`}>
          <div className="app-container animate-fade-in">
            <Header onCartOpen={openCart} />

            <main id="main-content" className="main-content" role="main">
              <MenuSection onCartOpen={openCart} />
            </main>

            <footer className="site-footer" role="contentinfo">
              <p>© {new Date().getFullYear()} <strong>NMR'S UPTOWN</strong> Fine Dine Restaurant. All rights reserved.</p>
            </footer>
          </div>

          <CartDrawer isOpen={cartOpen} onClose={closeCart} />

          {/* Dice FAB — Lucky Draw — bottom left */}
          <button
            className="dice-fab"
            onClick={() => setLuckyDrawOpen(true)}
            aria-label="Don't know what to eat — Lucky Draw"
            title="Don't know what to eat?"
          >
            <svg viewBox="0 0 40 40" width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="38" height="38" rx="9" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.35" strokeWidth="1.5"/>
              <rect x="3" y="3" width="34" height="11" rx="6" fill="white" fillOpacity="0.1"/>
              <circle cx="13" cy="13" r="3.5" fill="white"/>
              <circle cx="27" cy="13" r="3.5" fill="white"/>
              <circle cx="20" cy="20" r="3.5" fill="white"/>
              <circle cx="13" cy="27" r="3.5" fill="white"/>
              <circle cx="27" cy="27" r="3.5" fill="white"/>
            </svg>
          </button>

          {/* Floating Cart FAB */}
          <button
            className="cart-fab"
            onClick={openCart}
            aria-label={`Open cart — ${totalItems} items`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="cart-fab-badge">{totalItems}</span>
            )}
          </button>

          {/* Lucky Draw Modal */}
          <LuckyDraw isOpen={luckyDrawOpen} onClose={() => setLuckyDrawOpen(false)} />
        </div>
      )}
    </>
  );
};

const App: React.FC = () => (
  <CartProvider>
    <AppInner />
  </CartProvider>
);

export default App;
