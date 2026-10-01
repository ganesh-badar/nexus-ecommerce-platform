import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrdersModal from './components/OrdersModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import ToastNotification from './components/ToastNotification';
import SellerDashboard from './components/SellerDashboard';
import AddProductModal from './components/AddProductModal';
import EditProductModal from './components/EditProductModal';
import AuthModal from './components/AuthModal';
import {
  fetchProducts,
  fetchCategories,
  placeOrder,
  fetchUserOrders,
  cancelOrder,
  checkBackendHealth,
  createProduct,
  updateProduct,
  deleteProduct,
  updateOrderStatusAdmin,
  loginUser,
  registerUser
} from './services/api';
import { Database, Server, Layers, Cpu, ShieldCheck } from 'lucide-react';

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('LOGIN');

  // Perspective Role: 'CUSTOMER' or 'SELLER'
  const [currentRole, setCurrentRole] = useState(() => {
    try {
      const savedUser = localStorage.getItem('nexus_user');
      if (savedUser) {
        const u = JSON.parse(savedUser);
        return u.role === 'ROLE_ADMIN' ? 'SELLER' : 'CUSTOMER';
      }
    } catch {}
    return 'CUSTOMER';
  });

  // Catalog State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Customer Modals & Cart
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Seller Modals
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Orders & System
  const [orders, setOrders] = useState([]);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [isBackendLive, setIsBackendLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success', title = '') => {
    setToast({ message, type, title });
    setTimeout(() => setToast(null), 4000);
  };

  // 1. Initial Load
  useEffect(() => {
    const initialize = async () => {
      const isLive = await checkBackendHealth();
      setIsBackendLive(isLive);

      const cats = await fetchCategories();
      setCategories(cats);

      if (currentUser) {
        loadOrders(currentUser.id);
      }
    };
    initialize();
  }, [currentUser]);

  // 2. Fetch Products
  const loadProducts = async () => {
    setLoading(true);
    const res = await fetchProducts(selectedCategory, searchTerm);
    setProducts(res.data);
    if (res.isLive !== undefined) setIsBackendLive(res.isLive);
    setLoading(false);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadProducts();
    }, 200);

    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, searchTerm]);

  // 3. Load orders
  const loadOrders = async (userId = 1) => {
    setOrdersLoading(true);
    const res = await fetchUserOrders(userId);
    setOrders(res.orders);
    setOrdersLoading(false);
  };

  // Auth Actions
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('nexus_user', JSON.stringify(user));
    showToast(`Welcome back, ${user.firstName}!`, 'success', 'Signed In');
    if (user.role === 'ROLE_ADMIN') {
      setCurrentRole('SELLER');
    } else {
      setCurrentRole('CUSTOMER');
    }
    loadOrders(user.id);
  };

  const handleSignOut = () => {
    localStorage.removeItem('nexus_user');
    setCurrentUser(null);
    setCurrentRole('CUSTOMER');
    setCartItems([]);
    showToast('You have been signed out.', 'info');
  };

  const requireAuth = (callbackAction) => {
    if (!currentUser) {
      showToast('Please sign in or register to continue.', 'info', 'Authentication Required');
      setAuthInitialMode('LOGIN');
      setIsAuthOpen(true);
      return false;
    }
    return true;
  };

  // Cart Operations
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(product.stockQuantity, item.quantity + quantity) }
            : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
    showToast(`Added ${quantity}x "${product.name}" to cart.`, 'success');
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Order Placement
  const handleProceedToCheckout = () => {
    if (!requireAuth()) return;
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = async (payload) => {
    const finalPayload = {
      ...payload,
      userId: currentUser ? currentUser.id : 1
    };

    const res = await placeOrder(finalPayload);
    if (res.success) {
      setCartItems([]);
      showToast(
        `Order #${res.order.id} placed successfully! Recorded in MySQL database.`,
        'success',
        'Order Confirmed 🎉'
      );
      loadOrders(currentUser ? currentUser.id : 1);
      setIsOrdersOpen(true);
    }
  };

  const handleCancelOrder = async (orderId) => {
    const res = await cancelOrder(orderId);
    if (res.success) {
      showToast(`Order #${orderId} was cancelled. Inventory stock restored.`, 'info');
      loadOrders(currentUser ? currentUser.id : 1);
      loadProducts();
    }
  };

  // Seller Operations
  const handleCreateProduct = async (payload) => {
    const res = await createProduct(payload);
    if (res.success) {
      showToast(`Product "${res.product.name}" published to catalog!`, 'success', 'Listed Successfully 🚀');
      await loadProducts();
      const updatedCats = await fetchCategories();
      setCategories(updatedCats);
    }
  };

  const handleUpdateProduct = async (id, payload) => {
    const res = await updateProduct(id, payload);
    if (res.success) {
      showToast(`Updated "${res.product.name}" successfully!`, 'success');
      loadProducts();
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to remove this product from the catalog?')) {
      const res = await deleteProduct(id);
      if (res.success) {
        showToast('Product removed from catalog.', 'info');
        loadProducts();
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    const res = await updateOrderStatusAdmin(orderId, newStatus);
    if (res.success) {
      showToast(`Order #${orderId} status updated to ${newStatus}.`, 'success');
      loadOrders(currentUser ? currentUser.id : 1);
    }
  };

  // Sorting
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // featured default
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* 1. Navbar with Role Perspective Switcher and User Profile */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => {
          if (!requireAuth()) return;
          loadOrders(currentUser ? currentUser.id : 1);
          setIsOrdersOpen(true);
        }}
        orderCount={orders.length}
        isBackendLive={isBackendLive}
        currentRole={currentRole}
        onToggleRole={(role) => {
          if (role === 'SELLER' && (!currentUser || currentUser.role !== 'ROLE_ADMIN')) {
            showToast('Switching to Seller Portal requires Shop Owner authorization.', 'info');
            setAuthInitialMode('LOGIN');
            setIsAuthOpen(true);
            return;
          }
          setCurrentRole(role);
          showToast(`Switched to ${role === 'SELLER' ? 'Shop Owner / Seller Portal' : 'Customer Storefront'}`, 'info');
        }}
        onOpenAddProduct={() => {
          if (!requireAuth()) return;
          setIsAddProductOpen(true);
        }}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* 2. PERSPECTIVE RENDERING */}
      {currentRole === 'SELLER' ? (
        /* SELLER DASHBOARD VIEW */
        <main className="flex-grow-1">
          <SellerDashboard
            products={products}
            orders={orders}
            onOpenAddProduct={() => setIsAddProductOpen(true)}
            onEditProduct={(p) => setEditingProduct(p)}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        </main>
      ) : (
        /* CUSTOMER STOREFRONT VIEW */
        <>
          <HeroBanner />

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalCount={sortedProducts.length}
          />

          <main className="container flex-grow-1 mb-5">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="text-secondary mt-3">Loading product catalog...</p>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-5">
                <h4 className="text-white">No products found</h4>
                <p className="text-secondary">Try searching with a different keyword or category.</p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
                  className="btn btn-brand-outline mt-2"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="row g-4">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onQuickView={(prod) => setSelectedProduct(prod)}
                    />
                  </div>
                ))}
              </div>
            )}
          </main>
        </>
      )}

      {/* 3. Customer Modals */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onCancelOrder={handleCancelOrder}
        isLoading={ordersLoading}
        onOpenTracking={(order) => setTrackingOrder(order)}
      />

      {/* 4. Live Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={!!trackingOrder}
        order={trackingOrder}
        onClose={() => setTrackingOrder(null)}
      />

      {/* 4. Seller Modals */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onProductCreated={handleCreateProduct}
        categories={categories}
      />

      <EditProductModal
        isOpen={!!editingProduct}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onProductUpdated={handleUpdateProduct}
      />

      {/* 5. Authentication Modal (Login / Register Gate) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        onLogin={loginUser}
        onRegister={registerUser}
        initialMode={authInitialMode}
      />

      {/* 6. Toast Notifications */}
      <ToastNotification
        toast={toast}
        onClose={() => setToast(null)}
      />

      {/* 7. Architectural Footer */}
      <footer className="mt-auto border-top border-secondary border-opacity-25 py-4" style={{ background: '#090d16' }}>
        <div className="container">
          <div className="row align-items-center justify-content-between g-3">
            <div className="col-md-6 text-center text-md-start">
              <span className="brand-font fw-bold text-white fs-5">NEXUSTECH</span>
              <p className="text-secondary small mb-0 mt-1">
                Verified User Authentication &bull; Role-Based Access Control &bull; Spring Boot 3 + React 18
              </p>
            </div>

            <div className="col-md-6">
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-end gap-3 text-secondary small">
                <span className="d-flex align-items-center gap-1">
                  <ShieldCheck size={14} className="text-success" />
                  Auth Gate Active
                </span>
                <span className="d-flex align-items-center gap-1">
                  <Server size={14} className="text-primary" />
                  Spring Boot 3
                </span>
                <span className="d-flex align-items-center gap-1">
                  <Database size={14} className="text-info" />
                  MySQL &amp; JPA
                </span>
                <span className="d-flex align-items-center gap-1">
                  <Layers size={14} className="text-warning" />
                  Bootstrap 5
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
