import React from 'react';
import './Skeleton.css';

const Skeleton = ({ width, height, borderRadius, style, className = '' }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width: width || '100%',
        height: height || '20px',
        borderRadius: borderRadius || '4px',
        ...style,
      }}
    />
  );
};

export default Skeleton;
