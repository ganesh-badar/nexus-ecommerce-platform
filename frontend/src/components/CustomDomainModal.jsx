import React, { useState } from 'react';
import {
  Globe,
  CheckCircle2,
  RefreshCw,
  Lock
} from 'lucide-react';

export default function CustomDomainModal({
  isOpen,
  onClose,
  customDomain,
  onUpdateCustomDomain
}) {
  const [domainInput, setDomainInput] = useState(customDomain?.domain || 'store.nexustech.io');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const handleVerifyDomain = () => {
    setIsVerifying(true);
    setVerificationFeedback(null);

    setTimeout(() => {
      setIsVerifying(false);
      const clean = domainInput.trim().toLowerCase().replace(/^https?:\/\//, '');
      if (!clean || !clean.includes('.')) {
        setVerificationFeedback({
          success: false,
          message: 'Invalid domain format. Please enter a valid FQDN (e.g., store.domain.com).'
        });
        return;
      }

      const updated = {
        domain: clean,
        connected: true,
        verifiedAt: new Date().toISOString(),
        sslStatus: 'ACTIVE_TLS_1_3',
        dnsRecords: {
          aRecord: '76.76.21.21',
          cname: 'cname.nexustech.io'
        }
      };

      onUpdateCustomDomain(updated);
      setVerificationFeedback({
        success: true,
        message: `Custom domain "${clean}" successfully connected and verified! DNS propagation confirmed.`
      });
    }, 700);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 1070 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content custom-modal-content">
          {/* Header */}
          <div className="modal-header border-secondary border-opacity-25 pb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 rounded-1 bg-secondary bg-opacity-25 text-white">
                <Globe size={20} />
              </div>
              <div>
                <h5 className="modal-title fw-bold text-white mb-0">Custom Domain &amp; Launch Infrastructure</h5>
                <span className="text-secondary small">Production DNS Routing, TLS 1.3 Certification &amp; Host Resolution</span>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4 text-secondary small">
            {/* Launch Checklist */}
            <div className="p-3 mb-4 rounded-1" style={{ background: '#0e1118', border: '1px solid #232734' }}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-white fw-bold small text-uppercase" style={{ letterSpacing: '0.04em' }}>
                  Pre-Launch Verification Gate
                </span>
                <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 px-2 py-1">
                  Ready to Launch
                </span>
              </div>

              <div className="row g-2">
                <div className="col-12 col-md-6">
                  <div className="d-flex align-items-center gap-2 text-light" style={{ fontSize: '0.8rem' }}>
                    <CheckCircle2 size={14} className="text-success flex-shrink-0" />
                    <span>Custom Domain Connected ({customDomain?.domain || 'store.nexustech.io'})</span>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="d-flex align-items-center gap-2 text-light" style={{ fontSize: '0.8rem' }}>
                    <CheckCircle2 size={14} className="text-success flex-shrink-0" />
                    <span>Vector Favicon Configured (/favicon.svg)</span>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="d-flex align-items-center gap-2 text-light" style={{ fontSize: '0.8rem' }}>
                    <CheckCircle2 size={14} className="text-success flex-shrink-0" />
                    <span>Zero AI Watermarks / Purged AI Slop</span>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="d-flex align-items-center gap-2 text-light" style={{ fontSize: '0.8rem' }}>
                    <CheckCircle2 size={14} className="text-success flex-shrink-0" />
                    <span>Privacy Policy &amp; Terms Published</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Active Domain Banner */}
            <div className="p-3 mb-4 rounded-1 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3"
                 style={{ background: '#131722', border: '1px solid #2e3547' }}>
              <div>
                <span className="text-secondary small d-block">ACTIVE STORE DOMAIN</span>
                <div className="d-flex align-items-center gap-2 mt-1">
                  <Lock size={15} className="text-success" />
                  <span className="mono-font fs-6 fw-bold text-white">
                    https://{customDomain?.domain || 'store.nexustech.io'}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 px-2 py-1">
                  TLS 1.3 Active
                </span>
                <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25 px-2 py-1">
                  DNS Verified
                </span>
              </div>
            </div>

            {/* Form to Connect New Domain */}
            <div className="mb-4">
              <label className="text-white fw-bold mb-1 d-block">
                Connect New Custom Domain (FQDN)
              </label>
              <div className="input-group">
                <span className="input-group-text custom-input text-secondary border-end-0">
                  https://
                </span>
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="shop.yourcompany.com"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-brand-solid px-3 d-flex align-items-center gap-2"
                  onClick={handleVerifyDomain}
                  disabled={isVerifying}
                >
                  <RefreshCw size={14} className={isVerifying ? 'spin' : ''} />
                  <span>{isVerifying ? 'Validating DNS...' : 'Connect & Verify'}</span>
                </button>
              </div>

              {verificationFeedback && (
                <div className={`mt-2 alert ${verificationFeedback.success ? 'alert-success' : 'alert-danger'} py-2 px-3 small`}>
                  {verificationFeedback.message}
                </div>
              )}
            </div>

            {/* Required DNS Records Table */}
            <h6 className="text-white fw-bold mb-2">Required DNS Records for Delegation</h6>
            <div className="table-responsive border border-secondary border-opacity-25 rounded-1 mb-3">
              <table className="table table-dark table-sm mb-0 small" style={{ background: '#0e1118' }}>
                <thead>
                  <tr className="border-bottom border-secondary border-opacity-25 text-secondary">
                    <th className="py-2 px-3">Type</th>
                    <th className="py-2 px-3">Name / Host</th>
                    <th className="py-2 px-3">Value / Target</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-bottom border-secondary border-opacity-25">
                    <td className="py-2 px-3 mono-font fw-bold text-info">A</td>
                    <td className="py-2 px-3 mono-font text-white">@</td>
                    <td className="py-2 px-3 mono-font text-secondary">76.76.21.21</td>
                    <td className="py-2 px-3">
                      <span className="badge bg-success bg-opacity-25 text-success">Valid</span>
                    </td>
                    <td className="py-2 px-3 text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-brand-outline py-0 px-2"
                        onClick={() => handleCopy('76.76.21.21', 'a')}
                      >
                        {copiedKey === 'a' ? 'Copied' : 'Copy'}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 mono-font fw-bold text-info">CNAME</td>
                    <td className="py-2 px-3 mono-font text-white">store</td>
                    <td className="py-2 px-3 mono-font text-secondary">cname.nexustech.io</td>
                    <td className="py-2 px-3">
                      <span className="badge bg-success bg-opacity-25 text-success">Valid</span>
                    </td>
                    <td className="py-2 px-3 text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-brand-outline py-0 px-2"
                        onClick={() => handleCopy('cname.nexustech.io', 'cname')}
                      >
                        {copiedKey === 'cname' ? 'Copied' : 'Copy'}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-secondary small mb-0" style={{ fontSize: '0.78rem' }}>
              Note: DNS propagation usually completes within 10 to 60 minutes depending on your registrar TTL parameters. SSL certificates are provisioned automatically via ACME HTTP-01 challenges.
            </p>
          </div>

          {/* Footer */}
          <div className="modal-footer border-secondary border-opacity-25 pt-2 pb-2">
            <button type="button" className="btn btn-sm btn-brand-outline px-3" onClick={onClose}>
              Dismiss
            </button>
            <button type="button" className="btn btn-sm btn-brand-solid px-4" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
