import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 1070 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div className="modal-content custom-modal-content">
          {/* Header */}
          <div className="modal-header border-secondary border-opacity-25 pb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 rounded-1 bg-secondary bg-opacity-25 text-white">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h5 className="modal-title fw-bold text-white mb-0">Privacy Policy</h5>
                <span className="text-secondary small">Effective Date: October 10, 2026 &bull; Version 2.4</span>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4 text-secondary small" style={{ lineHeight: '1.65' }}>
            <div className="p-3 mb-4 rounded-1" style={{ background: '#0e1118', border: '1px solid #232734' }}>
              <div className="d-flex align-items-center gap-2 text-white fw-bold mb-1">
                <Lock size={15} className="text-info" />
                <span>Our Core Privacy Principle</span>
              </div>
              <p className="mb-0 text-secondary" style={{ fontSize: '0.8rem' }}>
                Nexus E-Commerce does not sell, broker, or monetize customer data. Personal telemetry is retained solely for inventory allocation, order dispatch, and regulatory tax compliance.
              </p>
            </div>

            <h6 className="text-white fw-bold mb-2">1. Information We Collect</h6>
            <p>
              When you interact with our direct hardware storefront or merchant console, we process the following categories of data:
            </p>
            <ul className="mb-3 ps-3">
              <li><strong className="text-white">Account Identification:</strong> Full name, verified email address, phone number, and credential hashes (salted SHA-256).</li>
              <li><strong className="text-white">Fulfillment &amp; Shipping Data:</strong> Physical street address, postal code, recipient contact, and carrier delivery instructions.</li>
              <li><strong className="text-white">Transaction Metadata:</strong> Order timestamps, item SKUs, purchase amounts, invoice identifiers, and payment method tokens. Credit card data is tokenized through PCI-DSS Level 1 compliant gateway partners; raw card numbers are never stored on our servers.</li>
              <li><strong className="text-white">Technical Telemetry:</strong> IP address, browser user-agent, session identifiers, and hardware client parameters for fraud prevention.</li>
            </ul>

            <h6 className="text-white fw-bold mb-2">2. Legal Grounds for Processing (GDPR &amp; CCPA Compliance)</h6>
            <p>
              We process personal data pursuant to the following lawful bases:
            </p>
            <ul className="mb-3 ps-3">
              <li><strong className="text-white">Contractual Performance (Art. 6(1)(b) GDPR):</strong> Required to fulfill hardware purchases, process warranty claims, and manage merchant order dispatches.</li>
              <li><strong className="text-white">Legal Obligations (Art. 6(1)(c) GDPR):</strong> Retention of commercial invoices and accounting ledgers for statutory audit requirements.</li>
              <li><strong className="text-white">Legitimate Interests (Art. 6(1)(f) GDPR):</strong> Preventing fraudulent transactions, securing server endpoints, and maintaining platform uptime.</li>
            </ul>

            <h6 className="text-white fw-bold mb-2">3. Data Retention and Erasure</h6>
            <p>
              Transactional and fulfillment logs are retained for seven (7) statutory fiscal years from order completion to comply with international trade and revenue laws. Account telemetry for dormant accounts is deleted upon verified request after 30 calendar days.
            </p>

            <h6 className="text-white fw-bold mb-2">4. Third-Party Disclosures</h6>
            <p>
              Data is shared strictly with downstream entities essential to fulfillment:
            </p>
            <ul className="mb-3 ps-3">
              <li><strong className="text-white">Logistics &amp; Couriers:</strong> DHL Express, FedEx, and regional postal authorities for tracked physical transit.</li>
              <li><strong className="text-white">Payment Networks:</strong> Stripe, Razorpay, or banking networks for settlement verification.</li>
              <li><strong className="text-white">Infrastructure Hosts:</strong> Encrypted hosting providers operating ISO/IEC 27001-certified datacenters.</li>
            </ul>

            <h6 className="text-white fw-bold mb-2">5. Cookies and Client Storage</h6>
            <p>
              We employ strictly necessary session and local storage primitives to persist your shopping cart state, role perspective, and authenticated session tokens. We do not embed third-party advertising cookies or cross-site tracking pixels.
            </p>

            <h6 className="text-white fw-bold mb-2">6. Consumer Rights &amp; Access Requests</h6>
            <p>
              You maintain the legal right to request access, rectification, export, or deletion of your stored records. You may execute these rights by contacting our compliance officer at <span className="mono-font text-white">privacy@nexustech.io</span>.
            </p>

            <h6 className="text-white fw-bold mb-2">7. Security Safeguards</h6>
            <p className="mb-0">
              All communications are enforced over TLS 1.3 with AES-256 encryption. Database access is strictly sandboxed via role-based authentication and principle-of-least-privilege architecture.
            </p>
          </div>

          {/* Footer */}
          <div className="modal-footer border-secondary border-opacity-25 pt-2 pb-2">
            <button type="button" className="btn btn-sm btn-brand-solid px-4 py-2" onClick={onClose}>
              Acknowledge &amp; Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
