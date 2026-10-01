import React, { useState } from 'react';
import { ShoppingCart, Eye, Star, Check } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onQuickView }) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 12;
  const isOutOfStock = product.stockQuantity <= 0;

  return (
    <div className="product-card h-100">
      {/* Image with category badge */}
      <div className="product-img-wrapper cursor-pointer" onClick={() => onQuickView(product)}>
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
        <span className="badge-category">{product.category}</span>
      </div>

      {/* Card Body */}
      <div className="p-3 d-flex flex-column flex-grow-1">
        {/* Rating and Stock Status */}
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center gap-1 text-warning" style={{ fontSize: '0.8rem' }}>
            <Star size={13} fill="currentColor" />
            <span className="fw-semibold text-light">4.9</span>
            <span className="text-secondary">(120+)</span>
          </div>

          <div>
            {isOutOfStock ? (
              <span className="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-25 badge-stock">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="badge-stock badge-stock-low">
                Only {product.stockQuantity} left
              </span>
            ) : (
              <span className="badge-stock badge-stock-in">
                In Stock ({product.stockQuantity})
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className="fs-6 fw-bold text-white mb-2 cursor-pointer text-truncate"
          title={product.name}
          onClick={() => onQuickView(product)}
        >
          {product.name}
        </h3>

        {/* Description snippet */}
        <p className="text-secondary small mb-3 flex-grow-1" style={{ fontSize: '0.82rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.description}
        </p>

        {/* Price & Action Footer */}
        <div className="d-flex align-items-center justify-content-between pt-2 border-top border-secondary border-opacity-25 mt-auto">
          <div>
            <span className="text-secondary" style={{ fontSize: '0.72rem', display: 'block' }}>Price</span>
            <span className="fs-5 fw-bold text-white">
              ${parseFloat(product.price).toFixed(2)}
            </span>
          </div>

          <div className="d-flex gap-2">
            <button
              onClick={() => onQuickView(product)}
              className="btn btn-sm btn-brand-outline p-2 rounded-3"
              title="Quick view product details"
            >
              <Eye size={16} />
            </button>

            <button
              onClick={handleAdd}
              disabled={isOutOfStock}
              className={`btn btn-sm ${added ? 'btn-success' : 'btn-brand-gradient'} px-3 py-2 rounded-3 d-flex align-items-center gap-1`}
              title="Add to shopping cart"
            >
              {added ? (
                <>
                  <Check size={16} />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
