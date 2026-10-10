import React from 'react';
import {
  ShoppingBag,
  Search,
  PackageCheck,
  Store,
  UserCheck,
  PlusCircle,
  LogIn,
  LogOut,
  Cpu
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
        {/* Brand Logo & Domain Identifier (NO EMOJIS, NO PURPLE) */}
        <div className="d-flex align-items-center gap-3">
          <a href="#" className="d-flex align-items-center gap-2 text-decoration-none text-white brand-font fs-4 fw-bold">
            <div className="p-2 rounded-1 bg-white text-dark d-flex align-items-center justify-content-center" style={{ width: '34px', height: '34px' }}>
              <Cpu size={20} className="text-dark" />
            </div>
            <span>NEXUS<span className="text-secondary fw-normal">STORE</span></span>
          </a>
        </div>

        {/* Global Search Bar (Only shown in Buyer view) */}
        {!isSeller && (
          <div className="position-relative flex-grow-1 mx-lg-3" style={{ maxWidth: '380px', minWidth: '200px' }}>
            <Search size={16} className="position-absolute text-muted" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-control custom-input ps-5"
              placeholder="Search hardware, audio, displays..."
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

        {/* Navigation Action Buttons (NO PILL SHAPES) */}
        <div className="d-flex align-items-center gap-2 ms-auto ms-lg-0">
          {/* Role Perspective Switcher (Rectangular tabs) */}
          <div className="btn-group p-1 rounded-1" style={{ background: '#11151f', border: '1px solid #232734' }}>
            <button
              onClick={() => onToggleRole('CUSTOMER')}
              className={`btn btn-sm px-3 py-1 rounded-1 d-flex align-items-center gap-1 fw-bold ${!isSeller ? 'btn-brand-solid' : 'text-secondary'}`}
              style={{ fontSize: '0.78rem' }}
            >
              <UserCheck size={14} />
              <span>Buyer View</span>
            </button>
            <button
              onClick={() => onToggleRole('SELLER')}
              className={`btn btn-sm px-3 py-1 rounded-1 d-flex align-items-center gap-1 fw-bold ${isSeller ? 'btn-brand-solid' : 'text-secondary'}`}
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
              className="btn btn-sm btn-brand-solid d-flex align-items-center gap-2 px-3 py-2 rounded-1 ms-2 fw-bold"
            >
              <PlusCircle size={16} />
              <span>List Product</span>
            </button>
          ) : (
            <>
              {/* My Orders Button */}
              <button
                onClick={onOpenOrders}
                className="btn btn-brand-outline d-flex align-items-center gap-2 px-3 py-2 rounded-1"
                title="View placed orders"
              >
                <PackageCheck size={16} className="text-secondary" />
                <span className="d-none d-sm-inline">Orders</span>
                {orderCount > 0 && (
                  <span className="badge bg-secondary rounded-1 ms-1 mono-font">{orderCount}</span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="btn btn-brand-solid d-flex align-items-center gap-2 px-3 py-2 rounded-1 position-relative"
              >
                <ShoppingBag size={16} />
                <span className="d-none d-sm-inline">Cart</span>
                {cartCount > 0 && (
                  <span className="badge bg-danger rounded-1 px-1 ms-1 mono-font">
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
                  className="rounded-1 d-flex align-items-center justify-content-center text-dark fw-bold bg-white"
                  style={{
                    width: '32px',
                    height: '32px',
                    fontSize: '0.8rem'
                  }}
                  title={`${currentUser.firstName} ${currentUser.lastName} (${currentUser.role === 'ROLE_ADMIN' ? 'Shop Owner' : 'Customer'})`}
                >
                  {getInitials(currentUser)}
                </div>

                <div className="d-none d-md-block text-start" style={{ lineHeight: '1.2' }}>
                  <div className="text-white small fw-bold text-truncate" style={{ maxWidth: '110px' }}>
                    {currentUser.firstName}
                  </div>
                  <div className="text-secondary mono-font" style={{ fontSize: '0.65rem' }}>
                    {currentUser.role === 'ROLE_ADMIN' ? 'SELLER' : 'BUYER'}
                  </div>
                </div>

                <button
                  onClick={onSignOut}
                  className="btn btn-sm btn-brand-outline p-1 rounded-1 ms-1 text-danger border-danger border-opacity-25"
                  title="Sign out of account"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="btn btn-sm btn-brand-outline d-flex align-items-center gap-2 px-3 py-2 rounded-1 fw-bold"
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
