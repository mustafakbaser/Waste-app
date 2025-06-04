import React, { useState, useEffect } from 'react';
import type { Skip } from '../../types';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [currentImageUrl, setCurrentImageUrl] = useState(skip.image);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

  // Reset image state when skip changes
  useEffect(() => {
    setImageError(false);
    setImageLoading(true);
    setCurrentImageUrl(skip.image);
    setCurrentUrlIndex(0);
  }, [skip.image]);

  const fallbackUrls = [
    skip.image, // Original URL
    `${skip.image}.jpg`, // Try with .jpg extension
    `${skip.image}.png`, // Try with .png extension
    `${skip.image}.webp`, // Try with .webp extension
  ];

  const handleImageError = () => {
    console.log(`Image failed to load for skip ${skip.size}:`, currentImageUrl);
    
    // Try next fallback URL
    const nextIndex = currentUrlIndex + 1;
    if (nextIndex < fallbackUrls.length) {
      console.log(`Trying fallback URL ${nextIndex} for skip ${skip.size}:`, fallbackUrls[nextIndex]);
      setCurrentUrlIndex(nextIndex);
      setCurrentImageUrl(fallbackUrls[nextIndex]);
      setImageLoading(true); // Reset loading state for new URL
    } else {
      // All fallbacks failed
      console.log(`All image URLs failed for skip ${skip.size}`);
      setImageError(true);
      setImageLoading(false);
    }
  };

  const handleImageLoad = () => {
    console.log(`Image loaded successfully for skip ${skip.size}:`, currentImageUrl);
    setImageLoading(false);
    setImageError(false);
  };
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
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        )}
        {imageError ? (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">📦</div>
              <div className="text-sm">Skip Image</div>
            </div>
          </div>
        ) : (
          <img 
            src={currentImageUrl} 
            alt={`${skip.size} skip`} 
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
        <div className="absolute top-2 right-2">
          <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {skip.size}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {skip.size} Yard Skip
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {skip.hirePeriod} hire period
        </p>
        
        {/* Additional information tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {skip.allowedOnRoad && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Road Legal
            </span>
          )}
          {skip.allowsHeavyWaste && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              Heavy Waste OK
            </span>
          )}
          {skip.transportCost && (
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
              Transport: £{skip.transportCost}
            </span>
          )}
        </div>
        
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