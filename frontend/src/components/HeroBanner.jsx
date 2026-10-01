import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="container mt-4 mb-4">
      <div 
        className="p-4 p-md-5 rounded-4 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Glow accents */}
        <div 
          className="position-absolute rounded-circle"
          style={{
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
            top: '-80px',
            right: '-50px',
            pointerEvents: 'none'
          }}
        />

        <div className="row align-items-center position-relative">
          <div className="col-lg-8">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3"
                 style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <Sparkles size={14} className="text-primary-accent" style={{ color: '#a5b4fc' }} />
              <span style={{ fontSize: '0.825rem', color: '#c7d2fe', fontWeight: 600 }}>
                Spring Boot & React Full-Stack Architecture
              </span>
            </div>

            <h1 className="display-5 fw-bold text-white mb-3">
              Precision Tech, <br />
              <span style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Engineered for Peak Performance.
              </span>
            </h1>

            <p className="lead text-secondary mb-4" style={{ maxWidth: '600px', fontSize: '1rem' }}>
              Explore our verified catalog with real-time MySQL inventory management, ACID-compliant transactions, and instant order tracking.
            </p>

            {/* Perks Badges */}
            <div className="d-flex flex-wrap gap-4 text-secondary" style={{ fontSize: '0.85rem' }}>
              <div className="d-flex align-items-center gap-2">
                <Truck size={18} className="text-info" />
                <span>Free Express Shipping</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <ShieldCheck size={18} className="text-success" />
                <span>2-Year Full Coverage</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <RotateCcw size={18} className="text-warning" />
                <span>30-Day Hassle-Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
