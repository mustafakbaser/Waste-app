import React from 'react';
import type { Skip } from '../../types';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  return (
    <div 
      className={`
        relative bg-white rounded-lg overflow-hidden transition-all duration-300
        ${isSelected 
          ? 'border-2 border-blue-700 transform -translate-y-1 shadow-lg' 
          : 'border border-gray-200 hover:border-blue-500 shadow-md'}
      `}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select ${skip.size} skip for ${skip.price}`}
      onClick={() => onSelect(skip)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(skip);
        }
      }}
    >
      <div className="relative aspect-[5/3] overflow-hidden">
        <img 
          src={skip.image} 
          alt={`${skip.size} skip`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {skip.size}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {skip.size} Skip
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {skip.hirePeriod} hire period
        </p>
        <p className="text-blue-700 text-xl font-bold mb-4">
          {skip.price}
        </p>
        
        <button
          type="button"
          className={`
            w-full py-2 px-4 rounded transition-colors duration-200
            ${isSelected 
              ? 'bg-blue-700 text-white cursor-default' 
              : 'bg-white text-blue-700 border-2 border-blue-700 hover:bg-blue-700 hover:text-white'}
          `}
          onClick={() => onSelect(skip)}
          disabled={isSelected}
        >
          {isSelected ? 'Selected' : 'Select This Skip'}
        </button>
      </div>
    </div>
  );
};

export default SkipCard;