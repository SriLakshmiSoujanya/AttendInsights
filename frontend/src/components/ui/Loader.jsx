import React from 'react';

const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="loader-container">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div className="spinner"></div>
        <p style={{ color: 'var(--primary-color)', fontWeight: 500 }}>{text}</p>
      </div>
    </div>
  );
};

export default Loader;
