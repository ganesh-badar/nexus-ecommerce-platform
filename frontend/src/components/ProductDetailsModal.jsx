import React, { useState } from 'react';
import { X, ShoppingCart, ShieldCheck, Truck, Check } from 'lucide-react';

export default function ProductDetailsModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 1060 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content custom-modal-content overflow-hidden">
          {/* Modal Header */}
          <div className="modal-header border-secondary border-opacity-25 pb-2">
            <div className="d-flex align-items-center gap-2">
              <span className="badge-category position-static">{product.category}</span>
              <span className="mono-font text-secondary small">SKU: NX-{1000 + (product.id || 0)}</span>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="row g-4 align-items-center">
              {/* Product Image */}
              <div className="col-md-6">
                <div className="rounded-1 overflow-hidden border border-secondary border-opacity-25" style={{ background: '#090a0f' }}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-100"
                    style={{ maxHeight: '340px', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="col-md-6">
                {/* Verified Hardware Specification Badge (NO Fake Reviews) */}
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-secondary bg-opacity-25 text-light border border-secondary border-opacity-25 mono-font" style={{ fontSize: '0.72rem' }}>
                    VERIFIED OEM HARDWARE
                  </span>
                  <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25 mono-font" style={{ fontSize: '0.72rem' }}>
                    DIRECT ALLOCATION
                  </span>
                </div>

                <h2 className="fs-4 fw-bold text-white mb-2">{product.name}</h2>
                <div className="fs-3 fw-bold text-white mb-3">
                  ${parseFloat(product.price).toFixed(2)}
                </div>

                <p className="text-secondary small mb-4" style={{ lineHeight: '1.6' }}>
                  {product.description}
                </p>

                {/* Stock status */}
                <div className="mb-4">
                  <span className="text-secondary small d-block mb-1 mono-font" style={{ fontSize: '0.7rem' }}>INVENTORY RESERVATION:</span>
                  {product.stockQuantity > 0 ? (
                    <span className="badge-stock badge-stock-in">
                      In Stock &bull; Priority Handoff ({product.stockQuantity} units available)
                    </span>
                  ) : (
                    <span className="badge bg-danger bg-opacity-25 text-danger border border-danger">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Quantity & Add Action */}
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center border border-secondary rounded-1 p-1" style={{ background: '#0e1118' }}>
                    <button
                      className="btn btn-sm text-secondary"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 fw-bold text-white mono-font">{quantity}</span>
                    <button
                      className="btn btn-sm text-secondary"
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      disabled={quantity >= product.stockQuantity}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    disabled={product.stockQuantity <= 0}
                    className={`btn flex-grow-1 ${added ? 'btn-success' : 'btn-brand-solid'} py-2 rounded-1 d-flex align-items-center justify-content-center gap-2`}
                  >
                    {added ? (
                      <>
                        <Check size={16} />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        <span>Add &bull; ${(parseFloat(product.price) * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Badges */}
                <div className="d-flex gap-4 text-secondary small mt-4 pt-3 border-top border-secondary border-opacity-25" style={{ fontSize: '0.8rem' }}>
                  <div className="d-flex align-items-center gap-1">
                    <Truck size={14} className="text-info" />
                    <span className="text-light">Insured Courier</span>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <ShieldCheck size={14} className="text-success" />
                    <span className="text-light">2-Year Official Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
