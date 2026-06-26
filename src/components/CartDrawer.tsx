import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { menuData } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, addItem, updateQty, removeItem, clearCart, subtotal, gst, total, totalItems } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleAddAll = () => {
    menuData.forEach((category) => {
      category.items.forEach((item) => {
        const existing = items.find((i) => i.id === item.id);
        if (!existing) {
          addItem(item);
        }
      });
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop${isOpen ? ' cart-backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        id="cart-drawer"
        className={`cart-drawer${isOpen ? ' cart-drawer--open' : ''}`}
        aria-label="Order summary"
        aria-modal="true"
        role="dialog"
      >
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-left">
            <h2 className="cart-title">Order Summary</h2>
            {totalItems > 0 && (
              <span className="cart-count-badge">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
            )}
          </div>
          <button
            id="cart-close-btn"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <p className="cart-empty-title">Nothing here yet</p>
              <p className="cart-empty-sub">Tap any menu card or add all items below to start your order.</p>
              
              <button className="cart-add-all-btn" onClick={handleAddAll}>
                Add All Items to Cart
              </button>
              
              <button className="cart-empty-btn" onClick={onClose} style={{ marginTop: '4px' }}>
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="cart-items-scroll">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-unit">₹{item.price} each</p>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, -1)}
                      aria-label={`Remove one ${item.name}`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                    <span className="qty-count">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, 1)}
                      aria-label={`Add one more ${item.name}`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                  <p className="cart-item-total">₹{item.price * item.quantity}</p>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4h6v2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bill summary (Always visible) */}
        <div className="cart-summary">
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="cart-summary-row cart-gst-row">
            <span>GST (5%)</span>
            <span>₹{gst}</span>
          </div>
          <div className="cart-summary-divider" />
          <div className="cart-summary-row cart-total-row">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Actions (Always visible) */}
        <div className="cart-actions">
          <div className="cart-btn-message" role="status">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 6, verticalAlign: 'middle', display: 'inline-block' }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Call the waiter and continue
          </div>
          {items.length > 0 && (
            <button className="cart-clear-btn" onClick={clearCart}>
              Clear order
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;
