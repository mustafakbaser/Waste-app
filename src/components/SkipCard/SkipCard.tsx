import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import type { Skip } from '../../types';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  isCompareSelected: boolean;
  onSelect: (skip: Skip) => void;
  onCompareToggle: (skip: Skip) => void;
  compareEnabled: boolean;
}

const SkipCard: React.FC<SkipCardProps> = ({ 
  skip, 
  isSelected, 
  isCompareSelected,
  onSelect, 
  onCompareToggle,
  compareEnabled
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [currentImageUrl, setCurrentImageUrl] = useState(skip.image);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setImageError(false);
    setImageLoading(true);
    setCurrentImageUrl(skip.image);
    setCurrentUrlIndex(0);
  }, [skip.image]);

  const fallbackUrls = [
    skip.image,
    `${skip.image}.jpg`,
    `${skip.image}.png`,
    `${skip.image}.webp`,
  ];

  const handleImageError = () => {
    const nextIndex = currentUrlIndex + 1;
    if (nextIndex < fallbackUrls.length) {
      setCurrentUrlIndex(nextIndex);
      setCurrentImageUrl(fallbackUrls[nextIndex]);
      setImageLoading(true);
    } else {
      setImageError(true);
      setImageLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  return (
    <div 
      className={`
        group relative bg-white overflow-hidden
        transition-all duration-300 ease-out
        hover:shadow-xl rounded-2xl h-full
        flex flex-col
        ${isSelected 
          ? 'ring-2 ring-blue-500 shadow-lg transform scale-[1.02]' 
          : 'hover:scale-[1.02] shadow-md hover:shadow-xl border border-gray-100'}
        ${isHovered ? 'shadow-xl' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Compare Checkbox */}
      <div className="absolute top-4 left-4 z-20">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isCompareSelected}
            onChange={() => onCompareToggle(skip)}
            disabled={!isCompareSelected && !compareEnabled}
            className="form-checkbox h-5 w-5 text-blue-600 rounded-md border-2 border-white/70 shadow-md
              transition-all duration-200 ease-in-out
              focus:ring-blue-500 focus:ring-offset-0
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <span className="ml-2 text-sm font-medium bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full
            shadow-sm transition-all duration-200">
            Compare
          </span>
        </label>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-20 animate-fade-in">
          <CheckCircle className="w-8 h-8 text-blue-500 bg-white rounded-full shadow-lg" />
        </div>
      )}

      {/* Image Container */}
      <div 
        onClick={() => onSelect(skip)}
        className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(skip);
          }
        }}
      >
        {/* Loading State */}
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        )}

        {/* Image or Fallback */}
        {imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">📦</div>
              <div className="text-sm font-medium">Skip Image</div>
            </div>
          </div>
        ) : (
          <>
            <img 
              src={currentImageUrl} 
              alt={`${skip.size} yard skip`} 
              className={`
                w-full h-full object-cover transition-all duration-500
                group-hover:scale-105
                ${imageLoading ? 'opacity-0' : 'opacity-100'}
              `}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}

        {/* Size Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-blue-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            {skip.size} Yards
          </span>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="flex flex-col flex-grow p-6">
        {/* Upper Content */}
        <div className="flex-grow">
          {/* Title and Duration */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {skip.size} Yard Skip
            </h3>
            <p className="text-gray-600 text-sm">
              {skip.hirePeriod}
            </p>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {skip.allowedOnRoad && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-100">
                Road Legal
              </span>
            )}
            {skip.allowsHeavyWaste && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-amber-50 text-amber-700 border border-amber-100">
                Heavy Waste OK
              </span>
            )}
            {skip.transportCost && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                Transport: £{skip.transportCost}
              </span>
            )}
          </div>
        </div>
        
        {/* Fixed Bottom Section */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-baseline mb-4">
            <span className="text-2xl font-bold text-blue-600">
              {skip.price}
            </span>
            <span className="ml-2 text-sm text-gray-500">inc. VAT</span>
          </div>
          
          <button
            type="button"
            onClick={() => onSelect(skip)}
            disabled={isSelected}
            className={`
              w-full py-3 px-4 rounded-xl text-sm font-semibold
              transition-all duration-300 ease-out
              transform hover:scale-[1.02]
              disabled:transform-none
              ${isSelected 
                ? 'bg-blue-600 text-white cursor-default' 
                : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white'}
            `}
          >
            {isSelected ? 'Selected' : 'Select This Skip'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipCard;