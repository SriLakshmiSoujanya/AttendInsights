import React from 'react';

const Badge = ({ children, status = 'default', className = '' }) => {
  let statusClass = '';
  switch (status) {
    case 'good':
      statusClass = 'badge-good';
      break;
    case 'warning':
      statusClass = 'badge-warning';
      break;
    case 'critical':
      statusClass = 'badge-critical';
      break;
    default:
      statusClass = 'bg-gray-100 text-gray-700';
  }

  return (
    <span className={`badge ${statusClass} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
