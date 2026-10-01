import React from 'react';
import {
  ShoppingBag,
  Search,
  PackageCheck,
  Zap,
  Server,
  CheckCircle2,
  Store,
  UserCheck,
  PlusCircle,
  LogIn,
  LogOut,
  User
} from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  cartCount,
  onOpenCart,
  onOpenOrders,
  orderCount,
  isBackendLive,
  currentRole,
  onToggleRole,
  onOpenAddProduct,
  currentUser,
  onOpenAuth,
  onSignOut
}) {
  const isSeller = currentRole === 'SELLER';
  const isLoggedIn = !!currentUser;

  const getInitials = (user) => {
    if (!user) return '?';
    const first = user.firstName ? user.firstName[0] : '';
    const last = user.lastName ? user.lastName[0] : '';
    return (first + last).toUpperCase() || 'U';
  };

  return (
    <nav className="glass-nav py-3">
      <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3">
        {/* Brand Logo & Tagline */}
        <div className="d-flex align-items-center gap-3">
          <a href="#" className="d-flex align-items-center gap-2 text-decoration-none text-white brand-font fs-4 fw-bold">
            <div className="p-2 rounded-3 btn-brand-gradient d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
              <Zap size={22} className="text-white" />
            </div>
            <span>NEXUS<span className="text-primary-accent" style={{ color: '#818cf8' }}>TECH</span></span>
          </a>

          {/* Backend Connection Indicator */}
          <div className="d-none d-xl-flex align-items-center gap-1 px-2 py-1 rounded-pill"
               style={{ 
                 background: isBackendLive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                 border: `1px solid ${isBackendLive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                 fontSize: '0.72rem'
               }}
               title={isBackendLive ? "Connected to Spring Boot :8080 (MySQL)" : "Spring Boot Standalone Mode"}>
            {isBackendLive ? (
              <>
                <CheckCircle2 size={12} className="text-success" />
                <span className="text-success fw-medium">Spring Boot Live</span>
              </>
            ) : (
              <>
                <Server size={12} className="text-warning" />
                <span className="text-warning fw-medium">Spring Boot (Ready on :8080)</span>
              </>
            )}
          </div>
        </div>

        {/* Global Search Bar (Only shown in Buyer view) */}
        {!isSeller && (
          <div className="position-relative flex-grow-1 mx-lg-3" style={{ maxWidth: '380px', minWidth: '200px' }}>
            <Search size={18} className="position-absolute text-muted" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-control custom-input ps-5"
              placeholder="Search audio, laptops, cameras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="btn btn-sm text-muted position-absolute"
                style={{ right: '8px', top: '50%', transform: 'translateY(-50%)' }}
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className="d-flex align-items-center gap-2 ms-auto ms-lg-0">
          {/* Role Perspective Switcher */}
          <div className="btn-group p-1 rounded-pill" style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => onToggleRole('CUSTOMER')}
              className={`btn btn-sm px-3 py-1 rounded-pill d-flex align-items-center gap-1 fw-bold ${!isSeller ? 'btn-brand-gradient' : 'text-secondary'}`}
              style={{ fontSize: '0.78rem' }}
            >
              <UserCheck size={14} />
              <span>Buyer View</span>
            </button>
            <button
              onClick={() => onToggleRole('SELLER')}
              className={`btn btn-sm px-3 py-1 rounded-pill d-flex align-items-center gap-1 fw-bold ${isSeller ? 'btn-brand-gradient' : 'text-secondary'}`}
              style={{ fontSize: '0.78rem' }}
            >
              <Store size={14} />
              <span>Seller Portal</span>
            </button>
          </div>

          {/* If in Seller mode, show quick "List Product" button */}
          {isSeller ? (
            <button
              onClick={onOpenAddProduct}
              className="btn btn-sm btn-brand-gradient d-flex align-items-center gap-2 px-3 py-2 rounded-3 ms-2 fw-bold"
            >
              <PlusCircle size={16} />
              <span>List Product</span>
            </button>
          ) : (
            <>
              {/* My Orders Button */}
              <button
                onClick={onOpenOrders}
                className="btn btn-brand-outline d-flex align-items-center gap-2 px-3 py-2 rounded-3"
                title="View placed orders"
              >
                <PackageCheck size={18} className="text-info" />
                <span className="d-none d-sm-inline">Orders</span>
                {orderCount > 0 && (
                  <span className="badge bg-secondary rounded-pill ms-1">{orderCount}</span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="btn btn-brand-gradient d-flex align-items-center gap-2 px-3 py-2 rounded-3 position-relative"
              >
                <ShoppingBag size={18} />
                <span className="d-none d-sm-inline">Cart</span>
                {cartCount > 0 && (
                  <span className="badge bg-danger rounded-pill px-2 py-1 ms-1">
                    {cartCount}
                  </span>
                )}
              </button>
            </>
          )}

          {/* User Authentication & Profile */}
          <div className="d-flex align-items-center ms-2 ps-2 border-start border-secondary border-opacity-25">
            {isLoggedIn ? (
              <div className="d-flex align-items-center gap-2">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                  style={{
                    width: '36px',
                    height: '36px',
                    background: currentUser.role === 'ROLE_ADMIN' ? 'linear-gradient(135deg, #10b981, #06b6d4)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    fontSize: '0.82rem'
                  }}
                  title={`${currentUser.firstName} ${currentUser.lastName} (${currentUser.role === 'ROLE_ADMIN' ? 'Shop Owner' : 'Customer'})`}
                >
                  {getInitials(currentUser)}
                </div>

                <div className="d-none d-md-block text-start" style={{ lineHeight: '1.2' }}>
                  <div className="text-white small fw-bold text-truncate" style={{ maxWidth: '110px' }}>
                    {currentUser.firstName}
                  </div>
                  <div className="text-secondary" style={{ fontSize: '0.68rem' }}>
                    {currentUser.role === 'ROLE_ADMIN' ? 'Seller' : 'Customer'}
                  </div>
                </div>

                <button
                  onClick={onSignOut}
                  className="btn btn-sm btn-brand-outline p-1 rounded-2 ms-1 text-danger border-danger border-opacity-25"
                  title="Sign Out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="btn btn-sm btn-brand-outline d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-bold"
                style={{ borderColor: '#818cf8', color: '#c7d2fe' }}
              >
                <LogIn size={15} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
