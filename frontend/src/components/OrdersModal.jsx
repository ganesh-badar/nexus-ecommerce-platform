import React, { useState } from 'react';
import { Package, Clock, CheckCircle, AlertTriangle, XCircle, ArrowRight, Ban, Loader2 } from 'lucide-react';

export default function OrdersModal({
  isOpen,
  onClose,
  orders,
  onCancelOrder,
  isLoading
}) {
  const [cancellingId, setCancellingId] = useState(null);

  if (!isOpen) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PAID':
        return <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25">Paid</span>;
      case 'SHIPPED':
        return <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25">Shipped</span>;
      case 'DELIVERED':
        return <span className="badge bg-success text-white">Delivered</span>;
      case 'CANCELLED':
        return <span className="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-25">Cancelled</span>;
      case 'PENDING':
      default:
        return <span className="badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-25">Pending</span>;
    }
  };

  const handleCancel = async (orderId) => {
    if (window.confirm(`Are you sure you want to cancel Order #${orderId}? Stock will be refunded automatically.`)) {
      setCancellingId(orderId);
      try {
        await onCancelOrder(orderId);
      } finally {
        setCancellingId(null);
      }
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 1060 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content custom-modal-content">
          {/* Header */}
          <div className="modal-header border-secondary border-opacity-25">
            <div className="d-flex align-items-center gap-2">
              <Package size={20} className="text-info" />
              <h5 className="modal-title fw-bold text-white mb-0">
                Order History & Live Database Records
              </h5>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {isLoading ? (
              <div className="text-center py-5">
                <Loader2 size={36} className="text-primary spinner-border spinner-border-sm" />
                <p className="text-secondary mt-2">Loading orders from database...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                <Package size={48} className="text-muted mb-3 opacity-50" />
                <p className="lead fs-6 mb-2">No orders placed yet.</p>
                <p className="small text-muted">Add products to your cart and place an order to test database insertion!</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 p-md-4 rounded-3"
                    style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {/* Top Order Row */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 pb-3 mb-3 border-bottom border-secondary border-opacity-25">
                      <div>
                        <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
                          <span className="fw-bold text-white">Order #{order.id}</span>
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

                      <div className="text-end">
                        <div className="fs-5 fw-bold text-white mb-1">
                          ${parseFloat(order.totalAmount).toFixed(2)}
                        </div>
                        {order.status !== 'CANCELLED' && (
                          <button
                            onClick={() => handleCancel(order.id)}
                            disabled={cancellingId === order.id}
                            className="btn btn-sm btn-outline-danger py-1 px-2 d-inline-flex align-items-center gap-1"
                            style={{ fontSize: '0.75rem' }}
                            title="Cancels order and returns stock to MySQL database"
                          >
                            <Ban size={12} />
                            <span>{cancellingId === order.id ? 'Cancelling...' : 'Cancel Order'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="text-secondary small mb-3">
                      <strong>Destination:</strong> {order.shippingAddress}
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
