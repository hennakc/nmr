import React, { useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import MenuSection from './components/MenuSection';
import BlogSection from './components/BlogSection';
import './styles/global.css';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}

      {!isLoading && (
        <div className="app-container">
          <Header />
          <main id="main-content" role="main">
            <MenuSection />
            <BlogSection />
          </main>

          {/* Footer */}
          <footer
            role="contentinfo"
            style={{
              background: 'var(--bg-base)',
              borderTop: '1px solid var(--glass-border)',
              padding: '40px',
              textAlign: 'center',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--text-muted)',
              letterSpacing: '0.05em',
            }}
          >
            <p>
              © {new Date().getFullYear()}{' '}
              <span style={{ color: 'var(--brand-gold)', fontWeight: 600 }}>NMR'S UPTOWN</span>
              {' '}Fine Dine Restaurant. All rights reserved.
            </p>
          </footer>
        </div>
      )}
    </>
  );
};

export default App;
