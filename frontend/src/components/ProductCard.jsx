import React, { useState } from 'react';
import { ShoppingCart, Eye, Check } from 'lucide-react';

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
        {/* Genuine Technical Parameters & Stock Status (NO Fake Reviews or Fake Stars) */}
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="mono-font text-secondary" style={{ fontSize: '0.74rem', letterSpacing: '0.03em' }}>
            SKU: NX-{1000 + (product.id || 0)}
          </div>

          <div>
            {isOutOfStock ? (
              <span className="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-25 badge-stock">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="badge-stock badge-stock-low">
                Stock: {product.stockQuantity} Left
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

        {/* Factual Technical Description Snippet */}
        <p className="text-secondary small mb-3 flex-grow-1" style={{ fontSize: '0.8125rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
          {product.description}
        </p>

        {/* Price & Action Footer */}
        <div className="d-flex align-items-center justify-content-between pt-2 border-top border-secondary border-opacity-25 mt-auto">
          <div>
            <span className="text-secondary mono-font" style={{ fontSize: '0.7rem', display: 'block' }}>UNIT PRICE</span>
            <span className="fs-5 fw-bold text-white">
              ${parseFloat(product.price).toFixed(2)}
            </span>
          </div>

          <div className="d-flex gap-2">
            <button
              onClick={() => onQuickView(product)}
              className="btn btn-sm btn-brand-outline p-2 rounded-1"
              title="Inspect specifications"
            >
              <Eye size={15} />
            </button>

            <button
              onClick={handleAdd}
              disabled={isOutOfStock}
              className={`btn btn-sm ${added ? 'btn-success' : 'btn-brand-solid'} px-3 py-2 rounded-1 d-flex align-items-center gap-1`}
              title="Add to shopping cart"
            >
              {added ? (
                <>
                  <Check size={15} />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={15} />
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
