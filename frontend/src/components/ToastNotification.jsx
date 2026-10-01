import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastNotification({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="toast-container-custom">
      <div
        className={`toast-item d-flex align-items-center gap-3 p-3 rounded-3 shadow-lg border ${
          isSuccess
            ? 'bg-dark text-white border-success'
            : isError
            ? 'bg-dark text-white border-danger'
            : 'bg-dark text-white border-secondary'
        }`}
        style={{ minWidth: '320px', maxWidth: '420px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(17, 24, 39, 0.95)' }}
      >
        <div>
          {isSuccess && <CheckCircle2 size={22} className="text-success" />}
          {isError && <AlertCircle size={22} className="text-danger" />}
          {!isSuccess && !isError && <Info size={22} className="text-info" />}
        </div>

        <div className="flex-grow-1 small">
          <div className="fw-bold">{toast.title || (isSuccess ? 'Success' : 'Notice')}</div>
          <div className="text-secondary">{toast.message}</div>
        </div>

        <button className="btn btn-sm text-secondary p-0" onClick={onClose}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
