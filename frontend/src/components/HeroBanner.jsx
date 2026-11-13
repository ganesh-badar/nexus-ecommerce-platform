import React from 'react';
import { ShieldCheck, Truck, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="container mt-4 mb-4">
      <div 
        className="p-4 p-md-5 rounded-1 position-relative overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 75% 25%, #1e263b 0%, #111522 80%)',
          border: '1px solid #303D59'
        }}
      >
        <div className="row align-items-center position-relative">
          <div className="col-lg-9">
            {/* System Status Eyebrow Tag (Rectangular, NO Pill, NO Emoji) */}
            <div 
              className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-1"
              style={{ background: 'rgba(30, 38, 59, 0.8)', border: '1px solid #536684' }}
            >
              <Sparkles size={14} className="text-info" />
              <span className="mono-font" style={{ fontSize: '0.75rem', color: '#98A9C4', letterSpacing: '0.04em' }}>
                ENTERPRISE HARDWARE CATALOG &bull; DIRECT OEM DISPATCH &bull; NO COST EMI
              </span>
            </div>

            {/* Direct, Concrete Headline */}
            <h1 className="display-5 fw-bold text-white mb-3" style={{ letterSpacing: '-0.025em' }}>
              Direct Hardware Storefront &amp; Enterprise Logistics
            </h1>

            {/* Direct, Factual Product Copy */}
            <p className="mb-4" style={{ maxWidth: '680px', fontSize: '1rem', lineHeight: '1.6', color: '#98A9C4' }}>
              Verifiable manufacturer inventory covering professional studio audio, computing workstations, and field capture equipment. Real-time stock reservation, validated serial tracking, and same-day priority dispatch.
            </p>

            {/* Dual Action Buttons (Cupertino / Impeccable Style) */}
            <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
              <a href="#catalog" className="btn btn-brand-solid px-4 py-2 d-inline-flex align-items-center gap-2">
                Explore Workstations <ArrowRight size={16} />
              </a>
              <a href="#catalog" className="btn btn-brand-outline px-4 py-2">
                Direct OEM Dispatch
              </a>
            </div>

            {/* Operational Guarantees */}
            <div className="d-flex flex-wrap gap-4" style={{ fontSize: '0.82rem', color: '#98A9C4' }}>
              <div className="d-flex align-items-center gap-2">
                <Truck size={16} className="text-info" />
                <span style={{ color: '#DCE3EF' }}>24-Hour Carrier Handoff</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <ShieldCheck size={16} className="text-success" />
                <span style={{ color: '#DCE3EF' }}>2-Year Official Manufacturer Warranty</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <RotateCcw size={16} className="text-warning" />
                <span style={{ color: '#DCE3EF' }}>30-Day Inspection &amp; Return Protocol</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
