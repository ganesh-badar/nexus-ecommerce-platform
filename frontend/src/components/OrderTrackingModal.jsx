import React from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  XCircle,
  Copy,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function OrderTrackingModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  const isCancelled = order.status === 'CANCELLED';

  // Calculate delivery estimation (+3 days from order date)
  const orderDate = new Date(order.orderDate || Date.now());
  const estimatedDelivery = new Date(orderDate);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  const trackingNumber = `NX-EXP-${(order.id * 8923).toString().slice(-6)}`;

  // Determine active step index:
  // 0: Placed, 1: Paid/Confirmed, 2: Shipped, 3: Out for Delivery, 4: Delivered
  const getStepIndex = (status) => {
    switch (status) {
      case 'DELIVERED':
        return 4;
      case 'SHIPPED':
        return 2;
      case 'PAID':
        return 1;
      case 'PENDING':
      default:
        return 0;
    }
  };

  const currentStep = getStepIndex(order.status);

  const steps = [
    {
      title: 'Order Placed',
      desc: 'Order received & verified by fulfillment',
      time: orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      title: 'Payment Confirmed',
      desc: order.paymentMethod === 'COD' ? 'Cash on Delivery confirmed' : `Prepaid Payment Confirmed • ${order.paymentId || 'TXN-PAID'}`,
      time: 'Verified'
    },
    {
      title: 'Packed & Dispatched',
      desc: 'Dispatched from Nexus Central Fulfillment Center',
      time: order.status === 'SHIPPED' || order.status === 'DELIVERED' ? 'In Transit' : 'Pending'
    },
    {
      title: 'Out for Delivery',
      desc: 'Handed to courier delivery partner',
      time: order.status === 'DELIVERED' ? 'Completed' : 'Upcoming'
    },
    {
      title: 'Delivered',
      desc: 'Delivered to recipient address',
      time: order.status === 'DELIVERED' ? 'Delivered' : 'Estimated'
    }
  ];

  const copyTracking = () => {
    navigator.clipboard.writeText(trackingNumber);
    alert(`Tracking number ${trackingNumber} copied to clipboard!`);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 1070 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content custom-modal-content overflow-hidden">
          {/* Header */}
          <div className="modal-header border-secondary border-opacity-25 pb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 rounded-1 bg-white text-dark">
                <Truck size={18} className="text-dark" />
              </div>
              <div>
                <h5 className="modal-title fw-bold text-white mb-0">Live Package Tracking</h5>
                <span className="text-secondary small">Order #{order.id} &bull; Priority Express Courier</span>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
            {/* If Order is Cancelled */}
            {isCancelled ? (
              <div className="alert alert-danger d-flex align-items-center gap-3 p-3 mb-4 rounded-1 border-danger border-opacity-25">
                <XCircle size={32} className="flex-shrink-0 text-danger" />
                <div>
                  <h6 className="fw-bold mb-1">Order Successfully Cancelled</h6>
                  <p className="mb-0 small text-danger text-opacity-75">
                    Your cancellation request has been confirmed. Any payment charged has been refunded to your original payment method within 2-4 business days. No further action is required.
                  </p>
                </div>
              </div>
            ) : (
              /* Live Estimated Delivery Banner */
              <div
                className="p-3 p-md-4 rounded-1 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3"
                style={{ background: '#11151f', border: '1px solid #232734' }}
              >
                <div>
                  <span className="text-secondary small fw-bold text-uppercase d-block mb-1">
                    {order.status === 'DELIVERED' ? 'Delivery Completed' : 'Estimated Arrival'}
                  </span>
                  <div className="fs-4 fw-bold text-white d-flex align-items-center gap-2">
                    <Calendar size={20} className="text-info" />
                    <span>{estimatedDelivery.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="text-secondary small mt-1">
                    Carrier: <strong className="text-light">Nexus Express Priority Air</strong> &bull; Standard Ground
                  </div>
                </div>

                <div className="text-md-end">
                  <span className="text-secondary small d-block mb-1">Tracking Number</span>
                  <div className="d-flex align-items-center gap-2">
                    <code className="text-primary-accent fw-bold fs-6 px-2 py-1 rounded" style={{ background: '#0f172a', color: '#c7d2fe' }}>
                      {trackingNumber}
                    </code>
                    <button
                      onClick={copyTracking}
                      className="btn btn-sm btn-brand-outline p-1"
                      title="Copy Tracking ID"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Timeline */}
            {!isCancelled && (
              <div className="p-4 rounded-3 mb-4" style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h6 className="text-white fw-bold mb-4">Shipment Progress Stepper</h6>

                <div className="position-relative">
                  {steps.map((step, idx) => {
                    const isPassed = idx <= currentStep;
                    const isCurrent = idx === currentStep;

                    return (
                      <div key={idx} className="d-flex gap-3 position-relative pb-4">
                        {/* Connecting Line */}
                        {idx < steps.length - 1 && (
                          <div
                            className="position-absolute"
                            style={{
                              left: '15px',
                              top: '28px',
                              bottom: '0',
                              width: '2px',
                              background: idx < currentStep ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                              zIndex: 1
                            }}
                          />
                        )}

                        {/* Step Icon Badge */}
                        <div
                          className="rounded-1 d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{
                            width: '28px',
                            height: '28px',
                            background: isPassed ? (isCurrent ? '#2563eb' : '#10b981') : '#171a23',
                            border: `1.5px solid ${isPassed ? (isCurrent ? '#60a5fa' : '#34d399') : '#2e3547'}`,
                            color: 'white',
                            zIndex: 2
                          }}
                        >
                          {isPassed ? (
                            isCurrent ? (
                              <Clock size={16} />
                            ) : (
                              <CheckCircle2 size={16} />
                            )
                          ) : (
                            <span style={{ fontSize: '0.75rem' }}>{idx + 1}</span>
                          )}
                        </div>

                        {/* Step Details */}
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className={`fw-bold small ${isPassed ? 'text-white' : 'text-secondary'}`}>
                              {step.title}
                            </span>
                            <span className="text-secondary" style={{ fontSize: '0.72rem' }}>
                              {step.time}
                            </span>
                          </div>
                          <div className="text-secondary small mt-1" style={{ fontSize: '0.8rem' }}>
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Destination & Package Contents */}
            <div className="row g-3">
              {/* Delivery Address */}
              <div className="col-md-6">
                <div className="p-3 rounded-3 h-100" style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="d-flex align-items-center gap-2 text-secondary small fw-bold mb-2">
                    <MapPin size={16} className="text-danger" />
                    <span>DELIVERY DESTINATION</span>
                  </div>
                  <div className="text-white small fw-medium">{order.shippingAddress}</div>
                  <div className="text-secondary small mt-1">Recipient: {order.userName || 'Ganesh Kumar'}</div>
                </div>
              </div>

              {/* Items in Package */}
              <div className="col-md-6">
                <div className="p-3 rounded-3 h-100" style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="d-flex align-items-center gap-2 text-secondary small fw-bold mb-2">
                    <Package size={16} className="text-info" />
                    <span>PACKAGE CONTENTS ({order.items ? order.items.length : 1} items)</span>
                  </div>
                  <div className="d-flex flex-column gap-1 overflow-auto" style={{ maxHeight: '110px' }}>
                    {order.items && order.items.map((item, i) => (
                      <div key={i} className="text-secondary small d-flex justify-content-between">
                        <span className="text-truncate text-light me-2">{item.quantity}x {item.productName}</span>
                        <span className="text-white fw-bold">${parseFloat(item.subtotal).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer border-secondary border-opacity-25">
            <button type="button" className="btn btn-brand-outline" onClick={onClose}>
              Close Tracker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
