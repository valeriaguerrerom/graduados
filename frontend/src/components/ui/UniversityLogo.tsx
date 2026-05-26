import React from 'react';

interface UniversityLogoProps {
  className?: string;
  size?: number;
}

const UniversityLogo: React.FC<UniversityLogoProps> = ({ className = '', size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Escudo base */}
      <path
        d="M50 5 L85 20 L85 50 C85 70 70 85 50 95 C30 85 15 70 15 50 L15 20 Z"
        fill="#003B7A"
        stroke="#FDB913"
        strokeWidth="2"
      />
      
      {/* Cruz central */}
      <rect x="45" y="25" width="10" height="35" fill="#FDB913" rx="2" />
      <rect x="32.5" y="37.5" width="35" height="10" fill="#FDB913" rx="2" />
      
      {/* Libro abierto */}
      <path
        d="M30 65 L30 75 L48 78 L48 68 Z"
        fill="#FDB913"
      />
      <path
        d="M52 68 L52 78 L70 75 L70 65 Z"
        fill="#FDB913"
      />
      <path
        d="M48 68 L50 66 L52 68"
        stroke="#003B7A"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Detalles decorativos */}
      <circle cx="50" cy="22" r="3" fill="#FDB913" />
      <circle cx="50" cy="62" r="2" fill="#82bb08" />
    </svg>
  );
};

export default UniversityLogo;
