import React, { useState } from 'react';
import type { MenuItem } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCart } from '../context/CartContext';

interface MenuCardProps {
  item: MenuItem;
  index: number;
  onCartOpen: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, index, onCartOpen }) => {
  const { ref, isVisible } = useScrollReveal(0.08);
  const [flipped, setFlipped] = useState(false);
  const { addItem, items } = useCart();

  const delay = (index % 4) * 70;
  const cartItem = items.find((i) => i.id === item.id);
  const inCart = (cartItem?.quantity ?? 0) > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(item);
    onCartOpen();
  };

  return (
    <div
      ref={ref}
      id={`menu-item-${item.id}`}
      className={`flip-card${isVisible ? ' visible' : ''}${flipped ? ' flipped' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-label={`${item.name} — ₹${item.price}. Tap to see ingredients.`}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped((f) => !f)}
    >
      <div className="flip-card-inner">

        {/* ─── FRONT ─── */}
        <div className="flip-card-front">
          <div className="card-img-wrap">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="card-img"
                loading="lazy"
              />
            ) : (
              <div className="card-img-placeholder" aria-hidden="true" />
            )}
            <div className="card-flip-hint" aria-hidden="true">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M1 4v6h6M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
              </svg>
              Tap to peek
            </div>
            {inCart && (
              <div className="card-in-cart-badge" aria-label="In cart">
                {cartItem!.quantity} in cart
              </div>
            )}
          </div>

          <div className="card-bottom">
            <p className="card-num">#{String(index + 1).padStart(2, '0')}</p>
            <h3 className="card-name">{item.name}</h3>
            <div className="card-price-row">
              <p className="card-price"><sup>₹</sup>{item.price}</p>
              <button
                id={`add-to-cart-${item.id}`}
                className="card-add-btn"
                onClick={handleAddToCart}
                aria-label={`Add ${item.name} to cart`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add
              </button>
            </div>
          </div>
        </div>

        {/* ─── BACK ─── */}
        <div className="flip-card-back" aria-hidden={!flipped}>
          <div className="card-back-header">
            <p className="card-back-label">Made with</p>
            <h3 className="card-back-title">{item.name}</h3>
          </div>
          <div className="card-back-divider" />
          <div className="card-ingredients">
            {(item.ingredients ?? []).map((ing) => (
              <span key={ing} className="ingredient-pill">{ing}</span>
            ))}
          </div>
          <div className="card-back-price">
            <span className="card-back-price-val"><sup style={{ fontSize: 13 }}>₹</sup>{item.price}</span>
            <button
              className="card-add-btn card-add-btn--back"
              onClick={handleAddToCart}
              aria-label={`Add ${item.name} to cart`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
