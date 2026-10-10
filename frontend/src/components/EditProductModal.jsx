import React, { useState, useEffect } from 'react';
import { Edit3, CheckCircle, Loader2 } from 'lucide-react';

export default function EditProductModal({ isOpen, onClose, product, onProductUpdated }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setStockQuantity(product.stockQuantity || '');
      setCategory(product.category || '');
      setDescription(product.description || '');
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const payload = {
      name: name.trim(),
      category: category.trim(),
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity, 10),
      imageUrl: product.imageUrl,
      description: description.trim()
    };

    try {
      await onProductUpdated(product.id, payload);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 1060 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content custom-modal-content">
          <div className="modal-header border-secondary border-opacity-25 pb-3">
            <div className="d-flex align-items-center gap-2">
              <Edit3 size={20} className="text-warning" />
              <h5 className="modal-title fw-bold text-white mb-0">Edit Product (ID #{product.id})</h5>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} disabled={loading}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              {errorMsg && (
                <div className="alert alert-danger py-2 small mb-3">
                  {errorMsg}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold">Product Name</label>
                <input
                  type="text"
                  className="form-control custom-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label text-secondary small fw-bold">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    className="form-control custom-input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label text-secondary small fw-bold">Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control custom-input"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold">Description</label>
                <textarea
                  className="form-control custom-input"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="modal-footer border-secondary border-opacity-25">
              <button type="button" className="btn btn-brand-outline rounded-1" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-brand-solid px-4 py-2 d-flex align-items-center gap-2 fw-bold rounded-1"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="spinner-border spinner-border-sm" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    <span>Save Changes</span>
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
