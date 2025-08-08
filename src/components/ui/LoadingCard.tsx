import React from 'react';

interface LoadingCardProps {
  className?: string;
  lines?: number;
}

const LoadingCard: React.FC<LoadingCardProps> = ({ className = '', lines = 3 }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <div className="animate-pulse space-y-4">
        <div className="skeleton h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="skeleton h-4 bg-gray-200 rounded w-1/2"></div>
        {[...Array(lines)].map((_, i) => (
          <div key={i} className="skeleton h-3 bg-gray-200 rounded w-full"></div>
        ))}
        <div className="skeleton h-8 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default LoadingCard;