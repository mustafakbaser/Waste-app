import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
        group relative overflow-hidden
        transition-all duration-300 ease-out
        hover:shadow-xl rounded-2xl h-full
        flex flex-col
        ${isSelected 
          ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg transform scale-[1.02] bg-white dark:bg-gray-800' 
          : 'hover:scale-[1.02] shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'}
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
            className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-500 rounded-md border-2 border-white/70 dark:border-gray-600 shadow-md
              transition-all duration-200 ease-in-out
              focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-0
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <span className="ml-2 text-sm font-medium bg-black/50 dark:bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full
            shadow-sm transition-all duration-200">
            {t('skipCard.compare')}
          </span>
        </label>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-20 animate-fade-in">
          <CheckCircle className="w-8 h-8 text-blue-500 dark:text-blue-400 bg-white dark:bg-gray-800 rounded-full shadow-lg" />
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
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 dark:text-gray-500 text-sm">
              {t('skipCard.loading')}
            </div>
          </div>
        )}

        {/* Image or Fallback */}
        {imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <div className="text-center text-gray-400 dark:text-gray-500">
              <div className="text-4xl mb-2">📦</div>
              <div className="text-sm font-medium">{t('skipCard.imageAlt', { size: skip.size })}</div>
            </div>
          </div>
        ) : (
          <>
            <img 
              src={currentImageUrl} 
              alt={t('skipCard.imageAlt', { size: skip.size })}
              className={`
                w-full h-full object-cover transition-all duration-500
                group-hover:scale-105
                ${imageLoading ? 'opacity-0' : 'opacity-100'}
              `}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}

        {/* Size Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-blue-600/90 dark:bg-blue-500/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            {skip.size} {t('cart.yardSkip')}
          </span>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="flex flex-col flex-grow p-6">
        {/* Upper Content */}
        <div className="flex-grow">
          {/* Title and Duration */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {skip.size} {t('cart.yardSkip')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {skip.hirePeriod}
            </p>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {skip.allowedOnRoad && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium 
                bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 
                border border-green-100 dark:border-green-800">
                {t('skipCard.roadLegal')}
              </span>
            )}
            {skip.allowsHeavyWaste && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium 
                bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 
                border border-amber-100 dark:border-amber-800">
                {t('skipCard.heavyWaste')}
              </span>
            )}
            {skip.transportCost && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium 
                bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 
                border border-blue-100 dark:border-blue-800">
                {t('skipCard.transport')} {skip.transportCost}
              </span>
            )}
          </div>
        </div>
        
        {/* Fixed Bottom Section */}
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-baseline mb-4">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {skip.price}
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              inc. VAT
            </span>
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
                ? 'bg-blue-600 dark:bg-blue-500 text-white cursor-default' 
                : 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white'}
            `}
          >
            {isSelected ? t('skipCard.selected') : t('skipCard.select')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipCard;