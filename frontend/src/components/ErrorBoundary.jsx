import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Nexus Platform ErrorBoundary caught error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('nexus_user');
      localStorage.removeItem('nexus_cart');
    } catch (e) {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#090a0f',
          color: '#f8fafc',
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          padding: '24px'
        }}>
          <div style={{
            maxWidth: '520px',
            width: '100%',
            background: '#111318',
            border: '1px solid #232734',
            borderRadius: '6px',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '4px',
              background: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: '#090a0f'
            }}>
              <AlertTriangle size={24} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>
              System Exception Caught
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '24px', lineHeight: '1.6' }}>
              An error occurred during client execution. You can reload the storefront or reset local state cache.
            </p>
            {this.state.error?.message && (
              <div style={{
                background: '#141824',
                border: '1px solid #2d3448',
                color: '#f87171',
                padding: '10px 14px',
                borderRadius: '4px',
                fontSize: '0.78rem',
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: '20px',
                textAlign: 'left',
                overflowX: 'auto'
              }}>
                {this.state.error.message}
              </div>
            )}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                style={{
                  background: 'transparent',
                  border: '1px solid #232734',
                  color: '#f8fafc',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.85rem'
                }}
              >
                Retry Operation
              </button>
              <button
                onClick={this.handleReset}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #f8fafc',
                  color: '#090a0f',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.85rem'
                }}
              >
                Reset Cache &amp; Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
