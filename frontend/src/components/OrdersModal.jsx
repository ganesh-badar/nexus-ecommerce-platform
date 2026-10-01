import React, { useState } from 'react';
import {
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Ban,
  Loader2,
  Truck,
  Search,
  ExternalLink
} from 'lucide-react';

export default function OrdersModal({
  isOpen,
  onClose,
  orders,
  onCancelOrder,
  isLoading,
  onOpenTracking
}) {
  const [cancellingId, setCancellingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PAID':
        return <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25">Paid &amp; Processing</span>;
      case 'SHIPPED':
        return <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25">In Transit (Shipped)</span>;
      case 'DELIVERED':
        return <span className="badge bg-success text-white">Delivered</span>;
      case 'CANCELLED':
        return <span className="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-25">Cancelled</span>;
      case 'PENDING':
      default:
        return <span className="badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-25">Pending Confirmation</span>;
    }
  };

  const getMiniProgressPercent = (status) => {
    switch (status) {
      case 'DELIVERED': return 100;
      case 'SHIPPED': return 65;
      case 'PAID': return 35;
      case 'PENDING': return 15;
      case 'CANCELLED': return 0;
      default: return 20;
    }
  };

  const handleCancel = async (orderId) => {
    if (window.confirm(`Are you sure you want to cancel Order #${orderId}? Your payment will be refunded to your original payment method.`)) {
      setCancellingId(orderId);
      try {
        await onCancelOrder(orderId);
      } finally {
        setCancellingId(null);
      }
    }
  };

  // Filter orders by ID or address if searched
  const filteredOrders = orders.filter(o => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().replace('#', '');
    return o.id.toString().includes(q) ||
           (o.shippingAddress && o.shippingAddress.toLowerCase().includes(q)) ||
           (o.items && o.items.some(i => i.productName.toLowerCase().includes(q)));
  });

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 1060 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content custom-modal-content overflow-hidden">
          {/* Header */}
          <div className="modal-header border-secondary border-opacity-25 pb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 rounded-2 btn-brand-gradient">
                <Package size={18} className="text-white" />
              </div>
              <div>
                <h5 className="modal-title fw-bold text-white mb-0">
                  My Orders &amp; Live Shipment Tracking
                </h5>
                <span className="text-secondary small">Real-Time Express Courier Tracking &amp; Delivery Progress</span>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          {/* Quick Search & Filter Bar */}
          <div className="px-4 py-2 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between gap-3" style={{ background: '#0b1120' }}>
            <div className="position-relative flex-grow-1" style={{ maxWidth: '360px' }}>
              <Search size={15} className="position-absolute text-muted" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-control form-control-sm custom-input ps-5 py-1"
                placeholder="Track by Order # (e.g. 101) or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <span className="text-secondary small">
              Total: <strong className="text-white">{filteredOrders.length}</strong> orders
            </span>
          </div>

          <div className="modal-body p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {isLoading ? (
              <div className="text-center py-5">
                <Loader2 size={36} className="text-primary spinner-border spinner-border-sm" />
                <p className="text-secondary mt-2">Retrieving your orders...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                <Package size={48} className="text-muted mb-3 opacity-50" />
                <p className="lead fs-6 mb-2">No matching orders found.</p>
                <p className="small text-muted">Browse our tech collection and place an order to track it live!</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {filteredOrders.map((order) => {
                  const progressPct = getMiniProgressPercent(order.status);
                  const isCancelled = order.status === 'CANCELLED';

                  return (
                    <div
                      key={order.id}
                      className="p-3 p-md-4 rounded-3 position-relative"
                      style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {/* Top Order Row */}
                      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 pb-3 mb-3 border-bottom border-secondary border-opacity-25">
                        <div>
                          <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
                            <span className="fw-bold text-white fs-6">Order #{order.id}</span>
                            {getStatusBadge(order.status)}
                            {order.paymentMethod === 'COD' ? (
                              <span className="badge bg-secondary bg-opacity-50 text-warning border border-warning border-opacity-25" style={{ fontSize: '0.72rem' }}>
                                Cash on Delivery
                              </span>
                            ) : (
                              <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25" style={{ fontSize: '0.72rem' }}>
                                Prepaid &bull; {order.paymentId || 'TXN-PAID'}
                              </span>
                            )}
                          </div>
                          <div className="text-secondary small d-flex align-items-center gap-2">
                            <Clock size={13} />
                            <span>Placed on {new Date(order.orderDate).toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          {/* Live Track Package Action */}
                          <button
                            onClick={() => onOpenTracking(order)}
                            className="btn btn-sm btn-brand-gradient py-1 px-3 d-flex align-items-center gap-2 fw-bold"
                            style={{ fontSize: '0.8rem' }}
                            title="Open real-time interactive tracking timeline"
                          >
                            <Truck size={14} />
                            <span>Track Package</span>
                          </button>

                          <div className="text-end ps-2 border-start border-secondary border-opacity-25">
                            <div className="fs-5 fw-bold text-white">
                              ${parseFloat(order.totalAmount).toFixed(2)}
                            </div>
                            {!isCancelled && (
                              <button
                                onClick={() => handleCancel(order.id)}
                                disabled={cancellingId === order.id}
                                className="btn btn-sm btn-link text-danger p-0 text-decoration-none"
                                style={{ fontSize: '0.72rem' }}
                                title="Cancel order and request full refund"
                              >
                                {cancellingId === order.id ? 'Cancelling...' : 'Cancel Order'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Mini Delivery Progress Bar on Card */}
                      {!isCancelled && (
                        <div className="mb-3 p-2 rounded-2" style={{ background: '#0b1120', border: '1px solid rgba(255,255,255,0.04)' }}>
                          <div className="d-flex justify-content-between align-items-center small text-secondary mb-1">
                            <span className="d-flex align-items-center gap-1">
                              <Truck size={12} className="text-primary-accent" style={{ color: '#818cf8' }} />
                              <strong className="text-light">Delivery Status:</strong> {order.status === 'DELIVERED' ? 'Arrived at Destination' : order.status === 'SHIPPED' ? 'In Transit with Courier' : 'Order Processing'}
                            </span>
                            <span className="fw-bold" style={{ color: progressPct === 100 ? '#10b981' : '#818cf8' }}>
                              {progressPct}%
                            </span>
                          </div>
                          <div className="progress" style={{ height: '6px', background: '#1e293b' }}>
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated"
                              role="progressbar"
                              style={{
                                width: `${progressPct}%`,
                                background: progressPct === 100 ? '#10b981' : 'linear-gradient(90deg, #6366f1, #a855f7)'
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Shipping Address */}
                      <div className="text-secondary small mb-3">
                        <strong className="text-light">Destination:</strong> {order.shippingAddress}
                      </div>

                      {/* Order Line Items */}
                      <div className="d-flex flex-column gap-2">
                        {order.items && order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="d-flex align-items-center justify-content-between p-2 rounded-2"
                            style={{ background: 'rgba(255,255,255,0.03)' }}
                          >
                            <div className="d-flex align-items-center gap-3">
                              {item.productImageUrl ? (
                                <img
                                  src={item.productImageUrl}
                                  alt={item.productName}
                                  className="rounded"
                                  style={{ width: '42px', height: '42px', objectFit: 'cover' }}
                                />
                              ) : (
                                <div className="rounded bg-secondary d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                                  <Package size={16} />
                                </div>
                              )}
                              <div>
                                <div className="text-white small fw-bold">{item.productName}</div>
                                <div className="text-secondary" style={{ fontSize: '0.75rem' }}>
                                  Quantity: {item.quantity} &times; ${parseFloat(item.unitPrice).toFixed(2)}
                                </div>
                              </div>
                            </div>

                            <div className="text-white fw-bold small">
                              ${parseFloat(item.subtotal).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
