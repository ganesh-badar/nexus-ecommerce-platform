import React from 'react';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function HeroBanner({ onOpenDomainModal, customDomain }) {
  return (
    <div className="container mt-4 mb-4">
      <div 
        className="p-4 p-md-5 rounded-1 position-relative overflow-hidden"
        style={{
          background: '#0d1017',
          border: '1px solid #232734'
        }}
      >
        <div className="row align-items-center position-relative">
          <div className="col-lg-9">
            {/* System Status Eyebrow Tag (Rectangular, NO Pill, NO Emoji) */}
            <div 
              className="d-inline-flex align-items-center gap-2 px-2 py-1 mb-3 rounded-1 cursor-pointer"
              style={{ background: '#141824', border: '1px solid #2d3448' }}
              onClick={onOpenDomainModal}
              title="Click to inspect custom domain and DNS verification status"
            >
              <span className="rounded-circle bg-success" style={{ width: '6px', height: '6px' }} />
              <span className="mono-font" style={{ fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.04em' }}>
                HOST: {customDomain?.domain || 'store.nexustech.io'} &bull; DNS VERIFIED &bull; TLS 1.3
              </span>
            </div>

            {/* Direct, Concrete Headline (NO Vague Buzzwords, NO Purple Text) */}
            <h1 className="display-6 fw-bold text-white mb-3">
              Direct Hardware Storefront &amp; Enterprise Logistics
            </h1>

            {/* Direct, Factual Product Copy (NO AI Slop) */}
            <p className="text-secondary mb-4" style={{ maxWidth: '680px', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Verifiable manufacturer inventory covering professional studio audio, computing workstations, and field capture equipment. Real-time stock reservation, validated serial tracking, and same-day priority dispatch.
            </p>

            {/* Factual Operational Guarantees (Clean SVG Icons, NO Emojis) */}
            <div className="d-flex flex-wrap gap-4 text-secondary" style={{ fontSize: '0.82rem' }}>
              <div className="d-flex align-items-center gap-2">
                <Truck size={16} className="text-info" />
                <span className="text-light">24-Hour Carrier Handoff</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <ShieldCheck size={16} className="text-success" />
                <span className="text-light">2-Year Official Manufacturer Warranty</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <RotateCcw size={16} className="text-warning" />
                <span className="text-light">30-Day Inspection &amp; Return Protocol</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
