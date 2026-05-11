import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false, 
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${className}`} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
