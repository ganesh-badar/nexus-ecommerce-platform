import React, { useState } from 'react';
import { X, ShoppingCart, ShieldCheck, Truck, Star, Check } from 'lucide-react';

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
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 1060 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content custom-modal-content overflow-hidden">
          {/* Modal Header */}
          <div className="modal-header border-secondary border-opacity-25 pb-2">
            <span className="badge-category position-static">{product.category}</span>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="row g-4 align-items-center">
              {/* Product Image */}
              <div className="col-md-6">
                <div className="rounded-3 overflow-hidden border border-secondary border-opacity-25">
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
                <div className="d-flex align-items-center gap-1 text-warning mb-2" style={{ fontSize: '0.85rem' }}>
                  <Star size={15} fill="currentColor" />
                  <span className="fw-bold text-white">4.9</span>
                  <span className="text-secondary">(248 customer reviews)</span>
                </div>

                <h2 className="fs-4 fw-bold text-white mb-2">{product.name}</h2>
                <div className="fs-3 fw-bold text-primary-accent mb-3" style={{ color: '#818cf8' }}>
                  ${parseFloat(product.price).toFixed(2)}
                </div>

                <p className="text-secondary small mb-4">
                  {product.description}
                </p>

                {/* Stock status */}
                <div className="mb-4">
                  <span className="text-secondary small d-block mb-1">Availability:</span>
                  {product.stockQuantity > 0 ? (
                    <span className="badge-stock badge-stock-in">
                      In Stock &bull; Ready for Priority Dispatch ({product.stockQuantity} available)
                    </span>
                  ) : (
                    <span className="badge bg-danger bg-opacity-25 text-danger border border-danger">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Quantity & Add Action */}
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center border border-secondary rounded-3 p-1">
                    <button
                      className="btn btn-sm text-secondary"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 fw-bold text-white">{quantity}</span>
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
                    className={`btn flex-grow-1 ${added ? 'btn-success' : 'btn-brand-gradient'} py-2 rounded-3 d-flex align-items-center justify-content-center gap-2`}
                  >
                    {added ? (
                      <>
                        <Check size={18} />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        <span>Add to Cart &bull; ${(parseFloat(product.price) * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Badges */}
                <div className="d-flex gap-3 text-secondary small mt-4 pt-3 border-top border-secondary border-opacity-25">
                  <div className="d-flex align-items-center gap-1">
                    <Truck size={14} className="text-info" />
                    <span>Free Delivery</span>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <ShieldCheck size={14} className="text-success" />
                    <span>Authentic Guarantee</span>
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
