import React from 'react';
import { X, FileText, Scale, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 1070 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div className="modal-content custom-modal-content">
          {/* Header */}
          <div className="modal-header border-secondary border-opacity-25 pb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 rounded-1 bg-secondary bg-opacity-25 text-white">
                <Scale size={20} />
              </div>
              <div>
                <h5 className="modal-title fw-bold text-white mb-0">Terms &amp; Conditions of Sale</h5>
                <span className="text-secondary small">Commercial Agreement &bull; Last Revised: October 10, 2026</span>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4 text-secondary small" style={{ lineHeight: '1.65' }}>
            <div className="p-3 mb-4 rounded-1" style={{ background: '#0e1118', border: '1px solid #232734' }}>
              <div className="d-flex align-items-center gap-2 text-white fw-bold mb-1">
                <FileText size={15} className="text-warning" />
                <span>Binding Commercial Agreement</span>
              </div>
              <p className="mb-0 text-secondary" style={{ fontSize: '0.8rem' }}>
                By submitting an order or creating a merchant account on the Nexus E-Commerce Platform, you agree to these commercial terms in full. Please read carefully prior to executing transactions.
              </p>
            </div>

            <h6 className="text-white fw-bold mb-2">1. Scope of Service &amp; Eligibility</h6>
            <p>
              Nexus operates a direct-to-consumer and merchant fulfillment infrastructure for commercial-grade electronics, computing hardware, and studio audio interfaces. Buyers must be of legal age of majority in their jurisdiction to enter binding commercial agreements.
            </p>

            <h6 className="text-white fw-bold mb-2">2. Inventory Allocation &amp; Order Acceptance</h6>
            <p>
              Display of an item does not constitute an irrevocable offer of sale. Upon checkout submission, our transactional database executes an atomic inventory reservation. An order contract is formed solely upon issuance of an official order confirmation identifier (e.g. <span className="mono-font text-white">ORD-XXXXXX</span>). In the event of stock discrepancy or pricing typographical error, Nexus reserves the right to void the transaction and issue an immediate 100% refund.
            </p>

            <h6 className="text-white fw-bold mb-2">3. Pricing, Taxes &amp; Currency</h6>
            <p>
              All listed product pricing is denominated in USD unless explicitly indicated otherwise. Value Added Tax (VAT), sales tax, and applicable regional customs tariffs are calculated at checkout and detailed itemized on the final commercial invoice.
            </p>

            <h6 className="text-white fw-bold mb-2">4. Payment Processing &amp; Anti-Fraud Verification</h6>
            <p>
              Prepaid transactions (Credit/Debit Card, UPI, Net Banking) are settled via encrypted tokenization protocols. Nexus utilizes automated algorithmic fraud scoring. Suspicious orders exceeding standard risk thresholds may require secondary KYC verification prior to carrier handoff.
            </p>

            <h6 className="text-white fw-bold mb-2">5. Shipping, Courier Dispatch &amp; Transfer of Risk</h6>
            <p>
              In-stock items are allocated to courier networks within 24 operational hours. Risk of loss and title transfer to the customer upon verified delivery confirmation scan by the designated postal carrier. Customers are provided verifiable end-to-end tracking coordinates.
            </p>

            <h6 className="text-white fw-bold mb-2">6. 30-Day Inspection &amp; Return Protocols</h6>
            <p>
              Hardware purchases include a 30-calendar-day inspection window from recorded delivery date. Items eligible for refund must be in original factory condition with unbroken serial tags, original packaging, and complete accessories. Opened media or customized equipment may be subject to a standard 15% restocking fee.
            </p>

            <h6 className="text-white fw-bold mb-2">7. 24-Month Limited Manufacturer Warranty</h6>
            <p>
              All hardware units distributed through authorized merchant channels are covered by a standard 24-month limited warranty against manufacturing defects in components and workmanship. Damage arising from unauthorized firmware modification, water ingress, or physical impact is excluded.
            </p>

            <h6 className="text-white fw-bold mb-2">8. Merchant Operations &amp; Seller Responsibilities</h6>
            <p>
              Shop owners operating through the Seller Portal warrant that all product specifications, stock allotment numbers, and unit pricing accurately reflect actual warehouse stock. Unauthorized listing of counterfeit or uncertified components results in immediate terminal account suspension.
            </p>

            <h6 className="text-white fw-bold mb-2">9. Governing Law &amp; Dispute Resolution</h6>
            <p className="mb-0">
              These terms are governed by the commercial laws of Delaware, United States, without regard to conflict of law principles. Any dispute arising under these terms shall be resolved through binding commercial arbitration under AAA rules.
            </p>
          </div>

          {/* Footer */}
          <div className="modal-footer border-secondary border-opacity-25 pt-2 pb-2">
            <button type="button" className="btn btn-sm btn-brand-solid px-4 py-2" onClick={onClose}>
              Accept &amp; Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
