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
        aria-label="Your order"
        aria-modal="true"
        role="dialog"
      >
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-left">
            <h2 className="cart-title">Your Order</h2>
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
          <button
            id="cart-call-waiter-btn"
            className="cart-btn cart-btn-waiter"
            onClick={() => alert(totalItems > 0 ? 'A waiter has been notified!' : 'A waiter has been notified to assist you!')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            Call the Waiter
          </button>
          <button
            id="cart-checkout-btn"
            className="cart-btn cart-btn-checkout"
            onClick={() => alert(totalItems > 0 ? 'Please proceed to the counter. Your total is ₹' + total : 'Please proceed to the counter.')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            Order at the Counter
          </button>
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
