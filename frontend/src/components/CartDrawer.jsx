import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% sample tax
  const total = subtotal + tax;

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop show"
        style={{ opacity: 0.6, zIndex: 1040 }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="position-fixed top-0 end-0 h-100 p-4 custom-offcanvas d-flex flex-column shadow-lg"
        style={{ zIndex: 1050 }}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between pb-3 border-bottom border-secondary border-opacity-25">
          <div className="d-flex align-items-center gap-2">
            <ShoppingBag size={20} className="text-primary-accent" style={{ color: '#818cf8' }} />
            <h5 className="mb-0 fw-bold text-white">Your Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</h5>
          </div>
          <button className="btn-close btn-close-white" onClick={onClose}></button>
        </div>

        {/* Items List */}
        <div className="flex-grow-1 overflow-auto py-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-5 text-secondary">
              <ShoppingBag size={48} className="text-muted mb-3 opacity-50" />
              <p className="lead fs-6 mb-2">Your cart is currently empty.</p>
              <button onClick={onClose} className="btn btn-sm btn-brand-outline mt-2">
                Discover Products
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 rounded-3 d-flex gap-3 align-items-center"
                  style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="rounded-2"
                    style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                  />

                  <div className="flex-grow-1 min-w-0">
                    <h6 className="mb-1 text-white text-truncate small fw-bold" title={item.product.name}>
                      {item.product.name}
                    </h6>
                    <div className="text-secondary small mb-2">
                      ${parseFloat(item.product.price).toFixed(2)} each
                    </div>

                    {/* Quantity controls */}
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-inline-flex align-items-center border border-secondary rounded-2">
                        <button
                          className="btn btn-sm px-2 py-0 text-secondary"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-2 small text-white fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-sm px-2 py-0 text-secondary"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockQuantity}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="btn btn-sm text-danger p-1 ms-auto"
                        onClick={() => onRemoveItem(item.product.id)}
                        title="Remove from cart"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="pt-3 border-top border-secondary border-opacity-25">
            <div className="d-flex justify-content-between text-secondary small mb-1">
              <span>Subtotal</span>
              <span className="text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between text-secondary small mb-1">
              <span>Shipping</span>
              <span className="text-success fw-bold">FREE</span>
            </div>
            <div className="d-flex justify-content-between text-secondary small mb-3">
              <span>Estimated Tax (5%)</span>
              <span className="text-white">${tax.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between fs-5 fw-bold text-white mb-3">
              <span>Total</span>
              <span style={{ color: '#818cf8' }}>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="btn btn-brand-gradient w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2 fw-bold"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
