import React, { useState } from 'react';
import { PlusCircle, Image, DollarSign, Layers, Package, Sparkles, Loader2 } from 'lucide-react';

const PRESET_IMAGES = [
  { name: 'Wireless Earbuds', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80', cat: 'Audio' },
  { name: 'Smart Display', url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80', cat: 'Computers' },
  { name: 'Drone 4K', url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80', cat: 'Cameras' },
  { name: 'Smart Ring', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80', cat: 'Wearables' }
];

export default function AddProductModal({ isOpen, onClose, onProductCreated, categories }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Audio');
  const [customCategory, setCustomCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('20');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !stockQuantity || !description.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const finalCategory = category === 'CUSTOM' ? (customCategory.trim() || 'General') : category;

    const payload = {
      name: name.trim(),
      category: finalCategory,
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity, 10),
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80',
      description: description.trim()
    };

    try {
      await onProductCreated(payload);
      // Reset form
      setName('');
      setPrice('');
      setDescription('');
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to list product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 1060 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content custom-modal-content">
          {/* Header */}
          <div className="modal-header border-secondary border-opacity-25 pb-3">
            <div className="d-flex align-items-center gap-2">
              <PlusCircle size={22} className="text-primary-accent" style={{ color: '#818cf8' }} />
              <div>
                <h5 className="modal-title fw-bold text-white mb-0">List New Product (Seller Portal)</h5>
                <span className="text-secondary small">Creates a record via Spring Boot REST API & MySQL</span>
              </div>
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

              <div className="row g-3">
                {/* Product Name */}
                <div className="col-md-8">
                  <label className="form-label text-secondary small fw-bold">Product Name *</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="e.g. Bose QuietComfort Ultra Headphones"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Category */}
                <div className="col-md-4">
                  <label className="form-label text-secondary small fw-bold">Category *</label>
                  <select
                    className="form-select custom-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="CUSTOM">+ New Category...</option>
                  </select>
                </div>

                {category === 'CUSTOM' && (
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="Enter new category name (e.g. Gaming, Smart Home)"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Price */}
                <div className="col-md-6">
                  <label className="form-label text-secondary small fw-bold">Price (USD $) *</label>
                  <div className="input-group">
                    <span className="input-group-text custom-input text-secondary border-end-0">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      className="form-control custom-input border-start-0"
                      placeholder="299.99"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Initial Stock */}
                <div className="col-md-6">
                  <label className="form-label text-secondary small fw-bold">Initial Inventory Stock *</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control custom-input"
                    placeholder="25"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    required
                  />
                </div>

                {/* Image URL with Preset Pickers */}
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label text-secondary small fw-bold mb-0">Product Image URL *</label>
                    <span className="text-secondary small">Pick sample image:</span>
                  </div>

                  <div className="d-flex gap-2 mb-2 overflow-auto pb-1">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => { setImageUrl(preset.url); if (!category || category === 'CUSTOM') setCategory(preset.cat); }}
                        className="btn btn-sm btn-brand-outline py-1 px-2 d-flex align-items-center gap-1"
                        style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                      >
                        <Sparkles size={12} className="text-warning" />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>

                  <input
                    type="url"
                    className="form-control custom-input"
                    placeholder="https://images.unsplash.com/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                  />

                  {imageUrl && (
                    <div className="mt-2 rounded-3 overflow-hidden border border-secondary border-opacity-25" style={{ height: '110px' }}>
                      <img src={imageUrl} alt="Preview" className="w-100 h-100 object-fit-cover" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="col-12">
                  <label className="form-label text-secondary small fw-bold">Full Product Description *</label>
                  <textarea
                    className="form-control custom-input"
                    rows="3"
                    placeholder="Highlight features, warranty, specifications, and box contents..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer border-secondary border-opacity-25">
              <button type="button" className="btn btn-brand-outline" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-brand-gradient px-4 py-2 d-flex align-items-center gap-2 fw-bold"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="spinner-border spinner-border-sm" />
                    <span>Publishing to Catalog...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle size={18} />
                    <span>Publish to Live Catalog</span>
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
