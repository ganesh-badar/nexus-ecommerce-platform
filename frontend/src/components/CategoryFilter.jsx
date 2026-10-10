import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  totalCount
}) {
  return (
    <div className="container mb-4">
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 pb-3 border-bottom border-secondary border-opacity-25">
        {/* Category Structured Chips (NO PILLS) */}
        <div className="d-flex flex-wrap gap-2 align-items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown & Count */}
        <div className="d-flex align-items-center gap-3 ms-auto ms-md-0">
          <span className="text-secondary small d-none d-sm-inline mono-font" style={{ fontSize: '0.78rem' }}>
            COUNT: <strong className="text-white">{totalCount}</strong> SKUs
          </span>

          <div className="d-flex align-items-center gap-2">
            <SlidersHorizontal size={14} className="text-secondary" />
            <select
              className="form-select form-select-sm custom-input py-1 px-3"
              style={{ width: 'auto', fontSize: '0.8125rem' }}
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="featured">Featured Hardware</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
