import React from 'react';
import Card from './Card';

const StatCard = ({ title, value, icon: Icon, subtitle }) => {
  return (
    <Card className="flex items-center gap-4 animate-fade-in">
      {Icon && (
        <div style={{
          padding: '16px',
          background: 'hsla(231, 65%, 58%, 0.1)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--primary-color)'
        }}>
          <Icon size={28} />
        </div>
      )}
      <div>
        <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 500 }}>
          {title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>
            {value}
          </span>
          {subtitle && (
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
