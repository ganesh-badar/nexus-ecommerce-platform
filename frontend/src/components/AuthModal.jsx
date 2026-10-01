import React, { useState } from 'react';
import {
  User,
  Lock,
  Mail,
  UserPlus,
  LogIn,
  CheckCircle,
  AlertCircle,
  Store,
  ShoppingBag,
  Sparkles,
  Loader2,
  ShieldCheck
} from 'lucide-react';

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  onLogin,
  onRegister,
  initialMode = 'LOGIN' // 'LOGIN' or 'REGISTER'
}) {
  const [mode, setMode] = useState(initialMode);
  
  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('ROLE_CUSTOMER'); // ROLE_CUSTOMER or ROLE_ADMIN

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const res = await onLogin({ email: loginEmail, password: loginPassword });
    setLoading(false);

    if (res.success) {
      onAuthSuccess(res.user);
      onClose();
    } else {
      setErrorMsg(res.error || 'Invalid credentials. Please verify or register.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !registerEmail.trim() || !registerPassword) {
      setErrorMsg('Please fill in all required registration fields.');
      return;
    }

    if (registerPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    if (registerPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: registerEmail.trim(),
      password: registerPassword,
      role: accountType
    };

    const res = await onRegister(payload);
    setLoading(false);

    if (res.success) {
      onAuthSuccess(res.user);
      onClose();
    } else {
      setErrorMsg(res.error || 'Failed to register account.');
    }
  };

  // Quick Demo Autofills
  const fillCustomerDemo = () => {
    setLoginEmail('customer@example.com');
    setLoginPassword('password123');
    setErrorMsg('');
  };

  const fillSellerDemo = () => {
    setLoginEmail('admin@example.com');
    setLoginPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 1070 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content custom-modal-content overflow-hidden">
          {/* Top Banner */}
          <div className="p-4 text-center border-bottom border-secondary border-opacity-25" style={{ background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)' }}>
            <div className="d-inline-flex p-3 rounded-circle btn-brand-gradient mb-2 shadow-lg">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <h4 className="fw-bold text-white mb-1">
              {mode === 'LOGIN' ? 'Welcome Back to NexusTech' : 'Create Your Verified Account'}
            </h4>
            <p className="text-secondary small mb-0">
              {mode === 'LOGIN'
                ? 'Sign in to access your orders, cart, and seller back-office'
                : 'Join our verified platform as a customer or shop owner'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="d-flex border-bottom border-secondary border-opacity-25" style={{ background: '#0b1120' }}>
            <button
              onClick={() => { setMode('LOGIN'); setErrorMsg(''); }}
              className={`btn flex-fill py-3 rounded-0 fw-bold d-flex align-items-center justify-content-center gap-2 ${
                mode === 'LOGIN' ? 'text-primary-accent border-bottom border-2 border-primary' : 'text-secondary'
              }`}
              style={{ color: mode === 'LOGIN' ? '#818cf8' : undefined }}
            >
              <LogIn size={16} />
              <span>Sign In (Existing User)</span>
            </button>
            <button
              onClick={() => { setMode('REGISTER'); setErrorMsg(''); }}
              className={`btn flex-fill py-3 rounded-0 fw-bold d-flex align-items-center justify-content-center gap-2 ${
                mode === 'REGISTER' ? 'text-primary-accent border-bottom border-2 border-primary' : 'text-secondary'
              }`}
              style={{ color: mode === 'REGISTER' ? '#818cf8' : undefined }}
            >
              <UserPlus size={16} />
              <span>New Account (Register)</span>
            </button>
          </div>

          {/* Form Body */}
          <div className="p-4">
            {errorMsg && (
              <div className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2 mb-3">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* TAB 1: LOGIN */}
            {mode === 'LOGIN' && (
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">Email Address</label>
                  <div className="position-relative">
                    <Mail size={16} className="position-absolute text-muted" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="email"
                      className="form-control custom-input ps-5"
                      placeholder="your.email@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">Password</label>
                  <div className="position-relative">
                    <Lock size={16} className="position-absolute text-muted" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="password"
                      className="form-control custom-input ps-5"
                      placeholder="Enter password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Quick 1-Click Demo Logins */}
                <div className="p-3 rounded-3 mb-3" style={{ background: '#0b1120', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-secondary small fw-bold mb-2 d-flex align-items-center gap-1">
                    <Sparkles size={13} className="text-warning" />
                    <span>Instant Demo Accounts:</span>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      onClick={fillCustomerDemo}
                      className="btn btn-sm btn-brand-outline flex-fill py-1 d-flex align-items-center justify-content-center gap-1"
                      style={{ fontSize: '0.75rem' }}
                    >
                      <ShoppingBag size={12} className="text-info" />
                      <span>Customer (Ganesh)</span>
                    </button>
                    <button
                      type="button"
                      onClick={fillSellerDemo}
                      className="btn btn-sm btn-brand-outline flex-fill py-1 d-flex align-items-center justify-content-center gap-1"
                      style={{ fontSize: '0.75rem' }}
                    >
                      <Store size={12} className="text-warning" />
                      <span>Shop Owner (Admin)</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-brand-gradient w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2 fw-bold"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="spinner-border spinner-border-sm" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      <span>Sign In &amp; Continue</span>
                    </>
                  )}
                </button>

                <div className="text-center mt-3">
                  <span className="text-secondary small">Don't have an account yet? </span>
                  <button
                    type="button"
                    onClick={() => { setMode('REGISTER'); setErrorMsg(''); }}
                    className="btn btn-link text-primary-accent p-0 small text-decoration-none fw-bold"
                    style={{ color: '#818cf8' }}
                  >
                    Register here &rarr;
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: REGISTER */}
            {mode === 'REGISTER' && (
              <form onSubmit={handleRegisterSubmit}>
                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <label className="form-label text-secondary small fw-bold">First Name *</label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="e.g. Rahul"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label text-secondary small fw-bold">Last Name *</label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="e.g. Sharma"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label text-secondary small fw-bold">Email Address *</label>
                  <input
                    type="email"
                    className="form-control custom-input"
                    placeholder="name@example.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label text-secondary small fw-bold">Password *</label>
                    <input
                      type="password"
                      className="form-control custom-input"
                      placeholder="Min 6 characters"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label text-secondary small fw-bold">Confirm *</label>
                    <input
                      type="password"
                      className="form-control custom-input"
                      placeholder="Repeat password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Account Type Selection */}
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold d-block">Account Profile Type</label>
                  <div className="row g-2">
                    <div className="col-6">
                      <div
                        onClick={() => setAccountType('ROLE_CUSTOMER')}
                        className="p-2 rounded-3 cursor-pointer text-center"
                        style={{
                          background: accountType === 'ROLE_CUSTOMER' ? 'rgba(99, 102, 241, 0.2)' : '#0b1120',
                          border: `1.5px solid ${accountType === 'ROLE_CUSTOMER' ? '#818cf8' : 'rgba(255,255,255,0.08)'}`
                        }}
                      >
                        <ShoppingBag size={18} className="text-info mb-1" />
                        <div className="text-white small fw-bold">Customer</div>
                        <div className="text-secondary" style={{ fontSize: '0.68rem' }}>Browse &amp; buy</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div
                        onClick={() => setAccountType('ROLE_ADMIN')}
                        className="p-2 rounded-3 cursor-pointer text-center"
                        style={{
                          background: accountType === 'ROLE_ADMIN' ? 'rgba(99, 102, 241, 0.2)' : '#0b1120',
                          border: `1.5px solid ${accountType === 'ROLE_ADMIN' ? '#818cf8' : 'rgba(255,255,255,0.08)'}`
                        }}
                      >
                        <Store size={18} className="text-warning mb-1" />
                        <div className="text-white small fw-bold">Shop Owner</div>
                        <div className="text-secondary" style={{ fontSize: '0.68rem' }}>List &amp; fulfill</div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-brand-gradient w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2 fw-bold"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="spinner-border spinner-border-sm" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      <span>Complete Registration</span>
                    </>
                  )}
                </button>

                <div className="text-center mt-3">
                  <span className="text-secondary small">Already registered? </span>
                  <button
                    type="button"
                    onClick={() => { setMode('LOGIN'); setErrorMsg(''); }}
                    className="btn btn-link text-primary-accent p-0 small text-decoration-none fw-bold"
                    style={{ color: '#818cf8' }}
                  >
                    Sign In here &rarr;
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
