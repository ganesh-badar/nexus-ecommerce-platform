import React, { useState } from 'react';
import {
  Package,
  PlusCircle,
  Edit,
  Trash2,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function SellerDashboard({
  products,
  orders,
  onOpenAddProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateOrderStatus
}) {
  const [activeTab, setActiveTab] = useState('inventory');
  const [inventorySearch, setInventorySearch] = useState('');

  // Metrics
  const totalStockUnits = products.reduce((acc, p) => acc + (p.stockQuantity || 0), 0);
  const lowStockCount = products.filter(p => p.stockQuantity <= 12).length;
  const totalRevenue = orders
    .filter(o => o.status !== 'CANCELLED')
    .reduce((acc, o) => acc + parseFloat(o.totalAmount || 0), 0);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(inventorySearch.toLowerCase()))
  );

  return (
    <div className="container py-4">
      {/* Dashboard Top Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4 pb-3 border-bottom border-secondary border-opacity-25">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25 px-2 py-1">
              Shop Owner / Admin Console
            </span>
          </div>
          <h2 className="fs-3 fw-bold text-white mb-0">Merchant Operations & Catalog Control</h2>
          <span className="text-secondary small">
            Real-Time Warehouse Inventory, Order Fulfillment &amp; Sales Analytics
          </span>
        </div>

        <button
          onClick={onOpenAddProduct}
          className="btn btn-brand-gradient px-4 py-2 d-flex align-items-center gap-2 fw-bold rounded-3"
        >
          <PlusCircle size={18} />
          <span>List New Product</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="row g-3 mb-4">
        {/* Total Products */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 rounded-3" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-secondary small fw-bold">LISTED PRODUCTS</span>
              <div className="p-2 rounded-2 bg-primary bg-opacity-25 text-primary">
                <Package size={18} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-white">{products.length}</div>
            <div className="text-secondary small mt-1">Across multiple categories</div>
          </div>
        </div>

        {/* Total Inventory Units */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 rounded-3" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-secondary small fw-bold">TOTAL UNITS IN STOCK</span>
              <div className="p-2 rounded-2 bg-success bg-opacity-25 text-success">
                <Layers size={18} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-white">{totalStockUnits}</div>
            <div className="text-secondary small mt-1">
              {lowStockCount > 0 ? (
                <span className="text-warning d-flex align-items-center gap-1">
                  <AlertTriangle size={12} /> {lowStockCount} items low stock
                </span>
              ) : (
                <span className="text-success">Healthy stock levels</span>
              )}
            </div>
          </div>
        </div>

        {/* Orders Placed */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 rounded-3" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-secondary small fw-bold">CUSTOMER ORDERS</span>
              <div className="p-2 rounded-2 bg-info bg-opacity-25 text-info">
                <ShoppingBag size={18} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-white">{orders.length}</div>
            <div className="text-secondary small mt-1">
              {orders.filter(o => o.status === 'PENDING').length} awaiting fulfillment
            </div>
          </div>
        </div>

        {/* Total Gross Volume */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 rounded-3" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-secondary small fw-bold">GROSS SALES VOLUME</span>
              <div className="p-2 rounded-2 bg-warning bg-opacity-25 text-warning">
                <TrendingUp size={18} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-white">${totalRevenue.toFixed(2)}</div>
            <div className="text-secondary small mt-1">Verified Net Completed Sales</div>
          </div>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="d-flex gap-2 mb-3">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`btn ${activeTab === 'inventory' ? 'btn-brand-gradient' : 'btn-brand-outline'} px-4 py-2 rounded-3 fw-bold d-flex align-items-center gap-2`}
        >
          <Package size={18} />
          <span>Product Inventory ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`btn ${activeTab === 'orders' ? 'btn-brand-gradient' : 'btn-brand-outline'} px-4 py-2 rounded-3 fw-bold d-flex align-items-center gap-2`}
        >
          <ShoppingBag size={18} />
          <span>Customer Orders Fulfillment ({orders.length})</span>
        </button>
      </div>

      {/* Tab 1: Product Inventory Management */}
      {activeTab === 'inventory' && (
        <div className="p-4 rounded-3" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
            <h5 className="text-white fw-bold mb-0">Active Product Catalog</h5>
            <input
              type="text"
              className="form-control custom-input py-1 px-3"
              style={{ maxWidth: '300px', fontSize: '0.85rem' }}
              placeholder="Filter by title or category..."
              value={inventorySearch}
              onChange={(e) => setInventorySearch(e.target.value)}
            />
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle mb-0" style={{ background: 'transparent' }}>
              <thead>
                <tr className="text-secondary small border-bottom border-secondary border-opacity-25">
                  <th scope="col" style={{ width: '60px' }}>Image</th>
                  <th scope="col">Product Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Inventory Stock</th>
                  <th scope="col" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="border-bottom border-secondary border-opacity-10">
                    <td>
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="rounded-2"
                        style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>
                      <div className="fw-bold text-white">{p.name}</div>
                      <div className="text-secondary small text-truncate" style={{ maxWidth: '280px' }}>
                        {p.description}
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-secondary bg-opacity-50 text-light">{p.category}</span>
                    </td>
                    <td>
                      <span className="fw-bold text-white">${parseFloat(p.price).toFixed(2)}</span>
                    </td>
                    <td>
                      {p.stockQuantity <= 12 ? (
                        <span className="badge-stock badge-stock-low">
                          Low: {p.stockQuantity} left
                        </span>
                      ) : (
                        <span className="badge-stock badge-stock-in">
                          {p.stockQuantity} in stock
                        </span>
                      )}
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          onClick={() => onEditProduct(p)}
                          className="btn btn-sm btn-brand-outline p-2 rounded-2"
                          title="Edit price & stock"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="btn btn-sm btn-outline-danger p-2 rounded-2"
                          title="Delete from catalog"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders Fulfillment */}
      {activeTab === 'orders' && (
        <div className="p-4 rounded-3" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h5 className="text-white fw-bold mb-3">Live Order Stream & Status Transition</h5>

          {orders.length === 0 ? (
            <div className="text-center py-5 text-secondary">
              <ShoppingBag size={40} className="text-muted opacity-50 mb-2" />
              <p>No customer orders placed yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle mb-0">
                <thead>
                  <tr className="text-secondary small border-bottom border-secondary border-opacity-25">
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Payment</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Delivery Status</th>
                    <th className="text-end">Update Lifecycle</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-bottom border-secondary border-opacity-10">
                      <td className="fw-bold text-white">#{o.id}</td>
                      <td>
                        <div className="text-white small fw-bold">{o.userName || 'Ganesh Kumar'}</div>
                        <div className="text-secondary" style={{ fontSize: '0.75rem' }}>{o.userEmail}</div>
                      </td>
                      <td>
                        {o.paymentMethod === 'COD' ? (
                          <span className="badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-25 small">
                            COD (Collect on Delivery)
                          </span>
                        ) : (
                          <div>
                            <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 small">
                              Prepaid
                            </span>
                            <div className="text-secondary" style={{ fontSize: '0.7rem' }}>
                              {o.paymentId || 'TXN-PAID'}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="text-secondary small">
                        {new Date(o.orderDate).toLocaleDateString()}
                      </td>
                      <td className="small text-light">
                        {o.items ? o.items.map(i => `${i.quantity}x ${i.productName}`).join(', ') : '1 item'}
                      </td>
                      <td className="fw-bold text-white">
                        ${parseFloat(o.totalAmount).toFixed(2)}
                      </td>
                      <td>
                        <span className={`badge ${
                          o.status === 'PAID' ? 'bg-success' :
                          o.status === 'SHIPPED' ? 'bg-info text-dark' :
                          o.status === 'DELIVERED' ? 'bg-success' :
                          o.status === 'CANCELLED' ? 'bg-danger' : 'bg-warning text-dark'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <select
                          className="form-select form-select-sm custom-input d-inline-block"
                          style={{ width: 'auto', fontSize: '0.8rem' }}
                          value={o.status}
                          onChange={(e) => onUpdateOrderStatus(o.id, e.target.value)}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="PAID">PAID</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
