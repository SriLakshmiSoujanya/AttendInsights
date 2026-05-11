import React, { useEffect } from 'react';
import Card from './Card';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '600px' }}>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid hsl(214, 32%, 91%)'
          }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{title}</h2>
            <button 
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                borderRadius: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>
          <div style={{ padding: '24px', maxHeight: '70vh', overflowY: 'auto' }}>
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
