import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min(100, Math.max(0, Math.round((current / total) * 100)));
  
  // Scale from 1.0 (empty) to 1.3 (full) for the "growing" effect
  const scale = 1 + (percentage / 100) * 0.3;
  
  return (
    <div className="flex flex-col items-center justify-center my-2 select-none">
      <div 
        className="relative w-36 h-36 sm:w-44 sm:h-44 transition-transform duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)"
        style={{ transform: `scale(${scale})` }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className={`w-full h-full drop-shadow-xl overflow-visible ${percentage === 100 ? 'animate-pulse' : ''}`}
        >
          <defs>
            <linearGradient id="heartFill" x1="0" x2="0" y1="1" y2="0">
              <stop offset={`${percentage}%`} stopColor="#d92828" />
              <stop offset={`${percentage}%`} stopColor="#ffe4e6" />
            </linearGradient>
          </defs>
          
          <path 
            d="M50 88 C50 88 15 65 15 35 C15 18 28 8 42 8 C50 8 56 15 56 15 C56 15 62 8 70 8 C84 8 97 18 97 35 C97 65 62 88 50 88 Z" 
            fill="url(#heartFill)"
            stroke={percentage === 100 ? "#991b1b" : "#fda4af"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
      </div>
    </div>
  );
};