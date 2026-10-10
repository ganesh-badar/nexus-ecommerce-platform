import React, { useState } from 'react';
import {
  CreditCard,
  Truck,
  Lock,
  Loader2,
  QrCode,
  Smartphone,
  Building,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess
}) {
  const [shippingAddress, setShippingAddress] = useState('104 Silicon Valley Avenue, Sector 5, Bangalore');
  // Payment Type: 'PREPAID_UPI', 'PREPAID_CARD', 'PREPAID_NETBANKING', 'COD'
  const [paymentMethod, setPaymentMethod] = useState('PREPAID_UPI');
  
  // Prepaid form fields
  const [upiId, setUpiId] = useState('ganesh@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('321');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const isPrepaid = paymentMethod !== 'COD';

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!shippingAddress.trim()) {
      setErrorMsg('Please enter a valid delivery address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // If Prepaid, simulate instant bank gateway authorization
    let transactionId = null;
    if (isPrepaid) {
      setProcessingStep('Contacting Payment Gateway...');
      await new Promise(r => setTimeout(r, 600));

      setProcessingStep('Securing 256-Bit SSL Authorization...');
      await new Promise(r => setTimeout(r, 700));

      const prefix = paymentMethod === 'PREPAID_UPI' ? 'UPI' : paymentMethod === 'PREPAID_CARD' ? 'CARD' : 'NB';
      transactionId = `TXN-${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

      setProcessingStep(`Payment Approved! Ref: ${transactionId}`);
      await new Promise(r => setTimeout(r, 500));
    } else {
      setProcessingStep('Booking Cash on Delivery Order...');
      await new Promise(r => setTimeout(r, 400));
    }

    const payload = {
      userId: 1, // Logged in user (Ganesh Kumar)
      shippingAddress: shippingAddress.trim(),
      paymentMethod: paymentMethod,
      paymentId: transactionId,
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
      setProcessingStep('');
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 1060 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content custom-modal-content overflow-hidden">
          {/* Header */}
          <div className="modal-header border-secondary border-opacity-25 pb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 rounded-1 bg-white text-dark">
                <Lock size={18} className="text-dark" />
              </div>
              <div>
                <h5 className="modal-title fw-bold text-white mb-0">Secure Checkout &amp; Settlement</h5>
                <span className="text-secondary small">Direct Inventory Allocation &bull; Encrypted Gateway</span>
              </div>
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
                {/* Left Side: Shipping & Payment Method Selection */}
                <div className="col-lg-7">
                  {/* Step 1: Customer & Address */}
                  <h6 className="text-secondary fw-bold text-uppercase small mb-3 d-flex align-items-center gap-2">
                    <span className="badge rounded-circle bg-secondary px-2 py-1">1</span>
                    <span>Shipping Destination</span>
                  </h6>

                  <div className="mb-4">
                    <textarea
                      className="form-control custom-input"
                      rows="2"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Enter street address, building, city, postal code..."
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

                  {/* Step 2: Payment Method Selection */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="text-secondary fw-bold text-uppercase small mb-0 d-flex align-items-center gap-2">
                      <span className="badge rounded-circle bg-primary px-2 py-1">2</span>
                      <span>Payment Method</span>
                    </h6>
                    <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 small">
                      256-Bit SSL Encrypted
                    </span>
                  </div>

                  <div className="row g-2 mb-3">
                    {/* Option 1: Prepaid UPI */}
                    <div className="col-sm-6">
                      <div
                        onClick={() => setPaymentMethod('PREPAID_UPI')}
                        className="p-3 rounded-1 cursor-pointer h-100 transition"
                        style={{
                          background: paymentMethod === 'PREPAID_UPI' ? '#141824' : '#0d1017',
                          border: `1.5px solid ${paymentMethod === 'PREPAID_UPI' ? '#f8fafc' : '#232734'}`
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <div className="d-flex align-items-center gap-2">
                            <Smartphone size={16} className="text-white" />
                            <span className="text-white fw-bold small">Prepaid UPI / QR</span>
                          </div>
                          <span className="badge bg-success bg-opacity-25 text-success small">Instant</span>
                        </div>
                        <div className="text-secondary" style={{ fontSize: '0.75rem' }}>
                          Google Pay, PhonePe, Paytm, BHIM
                        </div>
                      </div>
                    </div>

                    {/* Option 2: Prepaid Card */}
                    <div className="col-sm-6">
                      <div
                        onClick={() => setPaymentMethod('PREPAID_CARD')}
                        className="p-3 rounded-1 cursor-pointer h-100 transition"
                        style={{
                          background: paymentMethod === 'PREPAID_CARD' ? '#141824' : '#0d1017',
                          border: `1.5px solid ${paymentMethod === 'PREPAID_CARD' ? '#f8fafc' : '#232734'}`
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <div className="d-flex align-items-center gap-2">
                            <CreditCard size={16} className="text-info" />
                            <span className="text-white fw-bold small">Prepaid Card</span>
                          </div>
                          <span className="badge bg-info bg-opacity-25 text-info small">Cards</span>
                        </div>
                        <div className="text-secondary" style={{ fontSize: '0.75rem' }}>
                          Visa, Mastercard, RuPay, Amex
                        </div>
                      </div>
                    </div>

                    {/* Option 3: Prepaid Net Banking */}
                    <div className="col-sm-6">
                      <div
                        onClick={() => setPaymentMethod('PREPAID_NETBANKING')}
                        className="p-3 rounded-1 cursor-pointer h-100 transition"
                        style={{
                          background: paymentMethod === 'PREPAID_NETBANKING' ? '#141824' : '#0d1017',
                          border: `1.5px solid ${paymentMethod === 'PREPAID_NETBANKING' ? '#f8fafc' : '#232734'}`
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <div className="d-flex align-items-center gap-2">
                            <Building size={16} className="text-warning" />
                            <span className="text-white fw-bold small">Net Banking</span>
                          </div>
                          <span className="badge bg-warning bg-opacity-25 text-warning small">Direct</span>
                        </div>
                        <div className="text-secondary" style={{ fontSize: '0.75rem' }}>
                          All major commercial institutions
                        </div>
                      </div>
                    </div>

                    {/* Option 4: Cash on Delivery */}
                    <div className="col-sm-6">
                      <div
                        onClick={() => setPaymentMethod('COD')}
                        className="p-3 rounded-3 cursor-pointer h-100 transition"
                        style={{
                          background: paymentMethod === 'COD' ? 'rgba(245, 158, 11, 0.18)' : '#0f172a',
                          border: `1.5px solid ${paymentMethod === 'COD' ? '#f59e0b' : 'rgba(255,255,255,0.08)'}`
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <div className="d-flex align-items-center gap-2">
                            <Truck size={18} className="text-warning" />
                            <span className="text-white fw-bold small">Cash on Delivery</span>
                          </div>
                          <span className="badge bg-secondary small">Postpaid</span>
                        </div>
                        <div className="text-secondary" style={{ fontSize: '0.75rem' }}>
                          Pay cash or UPI upon package arrival
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prepaid Interactive Inputs Section */}
                  <div className="p-3 rounded-3 mb-2" style={{ background: '#0b1120', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {paymentMethod === 'PREPAID_UPI' && (
                      <div>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="text-white small fw-bold d-flex align-items-center gap-2">
                            <Zap size={15} className="text-warning" />
                            Prepaid UPI Instant Gateway
                          </span>
                          <span className="text-success small fw-medium">No Convenience Fee</span>
                        </div>

                        <div className="row g-3 align-items-center">
                          <div className="col-md-7">
                            <label className="form-label text-secondary small">Enter Virtual Payment Address (VPA / UPI ID)</label>
                            <input
                              type="text"
                              className="form-control custom-input"
                              placeholder="e.g. yourname@okhdfcbank"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                            />
                            <div className="d-flex gap-1 mt-2">
                              {['@okhdfcbank', '@okaxis', '@ybl', '@paytm'].map(suffix => (
                                <button
                                  type="button"
                                  key={suffix}
                                  className="btn btn-sm btn-brand-outline py-0 px-2"
                                  style={{ fontSize: '0.7rem' }}
                                  onClick={() => setUpiId(`ganesh${suffix}`)}
                                >
                                  {suffix}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="col-md-5 text-center border-start border-secondary border-opacity-25 ps-md-3">
                            <div className="p-2 rounded bg-white d-inline-block shadow-sm mb-1">
                              <QrCode size={64} className="text-dark" />
                            </div>
                            <div className="text-secondary" style={{ fontSize: '0.7rem' }}>
                              Scan with any UPI App
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'PREPAID_CARD' && (
                      <div>
                        <span className="text-white small fw-bold d-block mb-2">Card Details (Prepaid Card Authorization)</span>
                        <div className="row g-2">
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control custom-input"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="Card Number"
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              className="form-control custom-input"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="password"
                              maxLength="4"
                              className="form-control custom-input"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="CVV"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'PREPAID_NETBANKING' && (
                      <div>
                        <span className="text-white small fw-bold d-block mb-2">Select Your Bank</span>
                        <select
                          className="form-select custom-input"
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                        >
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                          <option value="State Bank of India">State Bank of India (SBI)</option>
                          <option value="Axis Bank">Axis Bank</option>
                          <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}

                    {paymentMethod === 'COD' && (
                      <div className="d-flex align-items-center gap-2 text-warning small">
                        <Truck size={18} />
                        <span>You can pay cash or scan the delivery agent's QR code when the courier arrives.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Order Summary & Action */}
                <div className="col-lg-5">
                  <div className="p-4 rounded-3 h-100 d-flex flex-column justify-content-between" style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div>
                      <h6 className="text-white fw-bold mb-3">Order Invoice ({cartItems.length} items)</h6>

                      <div className="d-flex flex-column gap-2 mb-3 overflow-auto" style={{ maxHeight: '180px' }}>
                        {cartItems.map((item) => (
                          <div key={item.product.id} className="d-flex justify-content-between text-secondary small">
                            <span className="text-truncate me-2 text-light" style={{ maxWidth: '180px' }}>
                              {item.quantity}&times; {item.product.name}
                            </span>
                            <span className="text-white fw-medium">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-top border-secondary border-opacity-25 pt-3">
                        <div className="d-flex justify-content-between text-secondary small mb-1">
                          <span>Subtotal</span>
                          <span className="text-white">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between text-secondary small mb-1">
                          <span>Shipping</span>
                          <span className="text-success fw-bold">FREE</span>
                        </div>
                        <div className="d-flex justify-content-between text-secondary small mb-2">
                          <span>Estimated Tax</span>
                          <span className="text-white">${tax.toFixed(2)}</span>
                        </div>

                        <div className="d-flex justify-content-between fs-5 fw-bold text-white border-top border-secondary border-opacity-25 pt-2">
                          <span>Amount Due</span>
                          <span className="mono-font">${total.toFixed(2)}</span>
                        </div>

                        <div className="mt-2 text-center">
                          {isPrepaid ? (
                            <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 py-1 px-2 small">
                              Prepaid Order &bull; Status will be marked 'PAID'
                            </span>
                          ) : (
                            <span className="badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-25 py-1 px-2 small">
                              Postpaid COD &bull; Status marked 'PENDING'
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-top border-secondary border-opacity-25">
                      {isSubmitting && processingStep ? (
                        <div className="text-center py-2">
                          <Loader2 size={24} className="spinner-border text-white spinner-border-sm mb-2" />
                          <div className="text-white small fw-bold">{processingStep}</div>
                        </div>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting || cartItems.length === 0}
                          className="btn btn-brand-solid w-100 py-3 rounded-1 d-flex align-items-center justify-content-center gap-2 fw-bold fs-6"
                        >
                          {isPrepaid ? (
                            <>
                              <Lock size={16} />
                              <span>Authorize Payment &bull; ${total.toFixed(2)}</span>
                            </>
                          ) : (
                            <>
                              <Truck size={16} />
                              <span>Confirm Cash on Delivery Order</span>
                            </>
                          )}
                        </button>
                      )}

                      <div className="d-flex align-items-center justify-content-center gap-2 text-secondary small mt-2">
                        <ShieldCheck size={14} className="text-success" />
                        <span style={{ fontSize: '0.75rem' }}>256-Bit SSL Encrypted &bull; PCI-DSS Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
