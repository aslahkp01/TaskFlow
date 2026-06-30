import React from 'react';

const Logo = ({ size = 24, color = "currentColor", style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <rect x="2" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="2.5" />
    <path d="M14 5H22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M14 9H22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    
    <rect x="2" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth="2.5" />
    <path d="M14 15H22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M14 19H22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export default Logo;
