import React, { useState } from 'react';
import { CreditCard, Truck, CheckCircle2, Lock, Loader2 } from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess
}) {
  const [shippingAddress, setShippingAddress] = useState('104 Silicon Valley Avenue, Sector 5, Bangalore');
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!shippingAddress.trim()) {
      setErrorMsg('Please enter a valid shipping address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const payload = {
      userId: 1, // Logged-in demo user (Ganesh Kumar)
      shippingAddress: shippingAddress.trim(),
      items: cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }))
    };

    try {
      await onOrderSuccess(payload);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to process order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 1060 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content custom-modal-content">
          {/* Header */}
          <div className="modal-header border-secondary border-opacity-25">
            <div className="d-flex align-items-center gap-2">
              <Lock size={18} className="text-success" />
              <h5 className="modal-title fw-bold text-white mb-0">Secure Checkout</h5>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} disabled={isSubmitting}></button>
          </div>

          <form onSubmit={handleSubmitOrder}>
            <div className="modal-body p-4">
              {errorMsg && (
                <div className="alert alert-danger py-2 small mb-3">
                  {errorMsg}
                </div>
              )}

              <div className="row g-4">
                {/* Left Column: Customer & Shipping */}
                <div className="col-md-7">
                  <h6 className="text-secondary fw-bold text-uppercase small mb-3">1. Customer Information</h6>
                  <div className="p-3 rounded-3 mb-4" style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="fw-bold text-white">Ganesh Kumar</div>
                    <div className="text-secondary small">customer@example.com (User ID: 1)</div>
                  </div>

                  <h6 className="text-secondary fw-bold text-uppercase small mb-3">2. Shipping Destination</h6>
                  <div className="mb-4">
                    <label className="form-label text-secondary small">Delivery Address</label>
                    <textarea
                      className="form-control custom-input"
                      rows="3"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      required
                    />
                    <div className="d-flex gap-2 mt-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-brand-outline py-1 px-2"
                        style={{ fontSize: '0.75rem' }}
                        onClick={() => setShippingAddress('104 Silicon Valley Avenue, Sector 5, Bangalore')}
                      >
                        Default Home
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-brand-outline py-1 px-2"
                        style={{ fontSize: '0.75rem' }}
                        onClick={() => setShippingAddress('Unit 4B, Cyber Tech Park, Whitefield, Bangalore')}
                      >
                        Office HQ
                      </button>
                    </div>
                  </div>

                  <h6 className="text-secondary fw-bold text-uppercase small mb-3">3. Payment Selection</h6>
                  <div className="d-flex flex-column gap-2 mb-3">
                    <label className="p-3 rounded-3 d-flex align-items-center justify-content-between cursor-pointer"
                           style={{ background: paymentMethod === 'CARD' ? 'rgba(99, 102, 241, 0.15)' : '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="d-flex align-items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'CARD'}
                          onChange={() => setPaymentMethod('CARD')}
                        />
                        <span className="text-white small fw-bold">Credit / Debit Card (Simulated)</span>
                      </div>
                      <CreditCard size={18} className="text-secondary" />
                    </label>

                    <label className="p-3 rounded-3 d-flex align-items-center justify-content-between cursor-pointer"
                           style={{ background: paymentMethod === 'COD' ? 'rgba(99, 102, 241, 0.15)' : '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="d-flex align-items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'COD'}
                          onChange={() => setPaymentMethod('COD')}
                        />
                        <span className="text-white small fw-bold">Cash on Delivery (Pay on Arrival)</span>
                      </div>
                      <Truck size={18} className="text-secondary" />
                    </label>
                  </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="col-md-5">
                  <div className="p-3 rounded-3" style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <h6 className="text-white fw-bold mb-3">Order Summary ({cartItems.length} items)</h6>

                    <div className="d-flex flex-column gap-2 mb-3 max-h-48 overflow-auto" style={{ maxHeight: '180px' }}>
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="d-flex justify-content-between text-secondary small">
                          <span className="text-truncate me-2 text-light" style={{ maxWidth: '180px' }}>
                            {item.quantity}x {item.product.name}
                          </span>
                          <span className="text-white">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-top border-secondary border-opacity-25 pt-2">
                      <div className="d-flex justify-content-between text-secondary small mb-1">
                        <span>Subtotal</span>
                        <span className="text-white">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between text-secondary small mb-1">
                        <span>Shipping</span>
                        <span className="text-success fw-bold">FREE</span>
                      </div>
                      <div className="d-flex justify-content-between text-secondary small mb-2">
                        <span>Tax</span>
                        <span className="text-white">${tax.toFixed(2)}</span>
                      </div>

                      <div className="d-flex justify-content-between fs-5 fw-bold text-white border-top border-secondary border-opacity-25 pt-2">
                        <span>Amount Due</span>
                        <span style={{ color: '#818cf8' }}>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer border-secondary border-opacity-25">
              <button type="button" className="btn btn-brand-outline" onClick={onClose} disabled={isSubmitting}>
                Back to Cart
              </button>
              <button
                type="submit"
                disabled={isSubmitting || cartItems.length === 0}
                className="btn btn-brand-gradient px-4 py-2 d-flex align-items-center gap-2 fw-bold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spinner-border spinner-border-sm" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Authorize & Place Order</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
