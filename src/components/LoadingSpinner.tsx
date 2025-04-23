import React from 'react';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  text?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text,
  className = ''
}) => {
  const sizeClass = `loading-${size}`;
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <span className={`loading loading-spinner ${sizeClass}`}></span>
      {text && <p className="mt-2 text-sm opacity-70">{text}</p>}
    </div>
  );
};
