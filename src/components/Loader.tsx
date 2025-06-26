import React from 'react';
import '../styles/animations.css';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  className?: string;
}

export default function Loader({ size = 'medium', text, className }: LoaderProps) {
  const sizeClasses = {
    small: { width: '24px', height: '24px', borderWidth: '2px' },
    medium: { width: '40px', height: '40px', borderWidth: '4px' },
    large: { width: '64px', height: '64px', borderWidth: '4px' }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className || ''}`}>
      <div 
        className="loader" 
        style={sizeClasses[size]}
      ></div>
      {text && (
        <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
          {text}
        </p>
      )}
    </div>
  );
}