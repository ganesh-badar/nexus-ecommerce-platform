import React, { useState, useEffect } from 'react';
import {
  Lock,
  Mail,
  UserPlus,
  LogIn,
  CheckCircle,
  AlertCircle,
  Store,
  ShoppingBag,
  Loader2,
  ShieldCheck,
  X
} from 'lucide-react';

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  onLogin,
  onRegister,
  initialMode = 'LOGIN'
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
  const [accountType, setAccountType] = useState('ROLE_CUSTOMER');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [noticeMsg, setNoticeMsg] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode || 'LOGIN');
      setErrorMsg('');
      setNoticeMsg(null);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword) {
      setErrorMsg('Please enter your email and password.');
      setNoticeMsg(null);
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setNoticeMsg(null);

    const res = await onLogin({ email: loginEmail, password: loginPassword });
    setLoading(false);

    if (res.success) {
      onAuthSuccess(res.user);
      onClose();
    } else if (res.notRegistered) {
      const enteredEmail = loginEmail.trim();
      setRegisterEmail(enteredEmail);
      if (loginPassword) {
        setRegisterPassword(loginPassword);
        setConfirmPassword(loginPassword);
      }
      setMode('REGISTER');
      setErrorMsg('');
      setNoticeMsg({
        type: 'not_registered',
        title: 'Account Not Found — Switched to Register',
        message: `We couldn't find an account for "${enteredEmail}". We've switched you to registration with your details pre-filled so you can sign up instantly.`
      });
    } else {
      setErrorMsg(res.error || 'Invalid credentials. Please verify or register.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !registerEmail.trim() || !registerPassword) {
      setErrorMsg('Please fill in all required registration fields.');
      setNoticeMsg(null);
      return;
    }

    if (registerPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      setNoticeMsg(null);
      return;
    }

    if (registerPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      setNoticeMsg(null);
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setNoticeMsg(null);

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
    } else if (res.alreadyExists) {
      const enteredEmail = registerEmail.trim();
      setLoginEmail(enteredEmail);
      if (registerPassword) {
        setLoginPassword(registerPassword);
      }
      setMode('LOGIN');
      setErrorMsg('');
      setNoticeMsg({
        type: 'already_registered',
        title: 'Account Already Exists — Switched to Sign In',
        message: `An account for "${enteredEmail}" is already registered. We've switched you to Sign In so you can log in directly.`
      });
    } else {
      setErrorMsg(res.error || 'Failed to register account.');
    }
  };

  const fillCustomerDemo = () => {
    setLoginEmail('customer@example.com');
    setLoginPassword('password123');
    setErrorMsg('');
    setNoticeMsg(null);
  };

  const fillSellerDemo = () => {
    setLoginEmail('admin@example.com');
    setLoginPassword('admin123');
    setErrorMsg('');
    setNoticeMsg(null);
  };

  const switchToLogin = () => {
    setMode('LOGIN');
    setErrorMsg('');
    setNoticeMsg(null);
    if (!loginEmail && registerEmail) setLoginEmail(registerEmail);
  };

  const switchToRegister = () => {
    setMode('REGISTER');
    setErrorMsg('');
    setNoticeMsg(null);
    if (!registerEmail && loginEmail) setRegisterEmail(loginEmail);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 1070 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content custom-modal-content overflow-hidden position-relative">
          {/* Close button in header */}
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm text-secondary position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center p-1 rounded-1"
            style={{ zIndex: 10, background: 'rgba(255,255,255,0.08)' }}
            aria-label="Close"
          >
            <X size={16} className="text-white" />
          </button>

          {/* Top Banner (NO PURPLE GRADIENTS, NO PILL BADGES) */}
          <div className="p-4 text-center border-bottom border-secondary border-opacity-25" style={{ background: '#0e1118' }}>
            <div className="d-inline-flex p-2 rounded-1 bg-white text-dark mb-2">
              <ShieldCheck size={24} className="text-dark" />
            </div>
            <h4 className="fw-bold text-white mb-1">
              {mode === 'LOGIN' ? 'Access Nexus Account' : 'Register Verified Account'}
            </h4>
            <p className="text-secondary small mb-0">
              {mode === 'LOGIN'
                ? 'Authenticate to manage order dispatches, cart reservations, and merchant operations'
                : 'Join the direct hardware distribution platform'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="d-flex border-bottom border-secondary border-opacity-25" style={{ background: '#090a0f' }}>
            <button
              onClick={switchToLogin}
              className={`btn flex-fill py-3 rounded-0 fw-bold d-flex align-items-center justify-content-center gap-2 ${
                mode === 'LOGIN' ? 'text-white border-bottom border-2 border-white' : 'text-secondary'
              }`}
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>
            <button
              onClick={switchToRegister}
              className={`btn flex-fill py-3 rounded-0 fw-bold d-flex align-items-center justify-content-center gap-2 ${
                mode === 'REGISTER' ? 'text-white border-bottom border-2 border-white' : 'text-secondary'
              }`}
            >
              <UserPlus size={15} />
              <span>Register</span>
            </button>
          </div>

          {/* Form Body */}
          <div className="p-4">
            {/* Friendly Auto-Switch Notification */}
            {noticeMsg && (
              <div 
                className="p-3 rounded-1 mb-3 border shadow-sm animate-fade-in"
                style={{
                  background: '#141824',
                  borderColor: '#2d3448',
                  color: '#e2e8f0'
                }}
              >
                <div className="d-flex align-items-start gap-2">
                  <div 
                    className="p-1 rounded-1 flex-shrink-0 mt-0 bg-secondary bg-opacity-25 text-white"
                  >
                    <AlertCircle size={15} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-bold small text-white mb-1 d-flex align-items-center gap-2">
                      <span>{noticeMsg.title}</span>
                      <span className="badge bg-secondary text-white" style={{ fontSize: '0.65rem' }}>Auto-Switched</span>
                    </div>
                    <p className="small mb-0 text-secondary" style={{ lineHeight: 1.4, fontSize: '0.78rem' }}>
                      {noticeMsg.message}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNoticeMsg(null)}
                    className="btn btn-sm text-secondary p-0 ms-1"
                    aria-label="Dismiss"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2 mb-3 rounded-1">
                <AlertCircle size={15} className="flex-shrink-0" />
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
                      placeholder="name@example.com"
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
                      placeholder="Enter account password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Quick Autofill Demo Credentials */}
                <div className="p-2 rounded-1 mb-3" style={{ background: '#0e1118', border: '1px solid #232734' }}>
                  <div className="text-secondary small mb-1 mono-font" style={{ fontSize: '0.7rem' }}>
                    QUICK DEMO CREDENTIALS:
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      onClick={fillCustomerDemo}
                      className="btn btn-sm btn-brand-outline flex-fill py-1 d-flex align-items-center justify-content-center gap-1"
                      style={{ fontSize: '0.75rem' }}
                    >
                      <ShoppingBag size={12} className="text-info" />
                      <span>Customer Buyer</span>
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
                  className="btn btn-brand-solid w-100 py-3 rounded-1 d-flex align-items-center justify-content-center gap-2 fw-bold"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="spinner-border spinner-border-sm" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={16} />
                      <span>Sign In &amp; Continue</span>
                    </>
                  )}
                </button>

                <div className="text-center mt-3">
                  <span className="text-secondary small">Don't have an account yet? </span>
                  <button
                    type="button"
                    onClick={switchToRegister}
                    className="btn btn-link text-white p-0 small text-decoration-none fw-bold"
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
                      placeholder="e.g. John"
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
                      placeholder="e.g. Doe"
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
                        className="p-2 rounded-1 cursor-pointer text-center"
                        style={{
                          background: accountType === 'ROLE_CUSTOMER' ? '#141824' : '#0e1118',
                          border: `1.5px solid ${accountType === 'ROLE_CUSTOMER' ? '#f8fafc' : '#232734'}`
                        }}
                      >
                        <ShoppingBag size={16} className="text-info mb-1" />
                        <div className="text-white small fw-bold">Customer</div>
                        <div className="text-secondary" style={{ fontSize: '0.68rem' }}>Browse &amp; buy</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div
                        onClick={() => setAccountType('ROLE_ADMIN')}
                        className="p-2 rounded-1 cursor-pointer text-center"
                        style={{
                          background: accountType === 'ROLE_ADMIN' ? '#141824' : '#0e1118',
                          border: `1.5px solid ${accountType === 'ROLE_ADMIN' ? '#f8fafc' : '#232734'}`
                        }}
                      >
                        <Store size={16} className="text-warning mb-1" />
                        <div className="text-white small fw-bold">Shop Owner</div>
                        <div className="text-secondary" style={{ fontSize: '0.68rem' }}>List &amp; fulfill</div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-brand-solid w-100 py-3 rounded-1 d-flex align-items-center justify-content-center gap-2 fw-bold"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="spinner-border spinner-border-sm" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} />
                      <span>Complete Registration</span>
                    </>
                  )}
                </button>

                <div className="text-center mt-3">
                  <span className="text-secondary small">Already registered? </span>
                  <button
                    type="button"
                    onClick={switchToLogin}
                    className="btn btn-link text-white p-0 small text-decoration-none fw-bold"
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
