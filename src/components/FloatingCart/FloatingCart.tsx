import React, { useState, useEffect } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import type { Skip } from '../../types';
import { useTranslation } from 'react-i18next';

interface FloatingCartProps {
  selectedSkip: Skip | null;
  onBack: () => void;
  onContinue: () => void;
}

const FloatingCart: React.FC<FloatingCartProps> = ({
  selectedSkip,
  onBack,
  onContinue,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedSkip) {
      setIsExpanded(true);
    }
  }, [selectedSkip]);

  const toggleExpanded = () => {
    if (selectedSkip) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={`
      fixed z-50 transition-all duration-300 ease-in-out
      ${isExpanded 
        ? 'inset-x-0 bottom-0 px-4 pb-4 pt-2 md:inset-auto md:bottom-4 md:right-4 md:w-96' 
        : 'bottom-4 right-4 w-16 h-16'}
      ${selectedSkip ? 'opacity-100' : 'opacity-50'}
    `}>
      {/* Collapsed State */}
      {!isExpanded && (
        <button
          onClick={toggleExpanded}
          disabled={!selectedSkip}
          className={`
            w-full h-full rounded-full shadow-lg
            backdrop-blur-sm
            transition-all duration-300 ease-in-out
            hover:scale-105 active:scale-95
            ${selectedSkip 
              ? 'bg-blue-600/90 dark:bg-blue-500/90 hover:bg-blue-700/90 dark:hover:bg-blue-600/90 cursor-pointer' 
              : 'bg-gray-400/90 dark:bg-gray-600/90 cursor-not-allowed'}
          `}
          aria-label={selectedSkip ? t('cart.viewDetails') : t('cart.noSelection')}
        >
          <ShoppingCart className="w-6 h-6 text-white mx-auto" />
        </button>
      )}

      {/* Expanded State */}
      {isExpanded && selectedSkip && (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl animate-slide-up md:rounded-xl">
          {/* Mobile Handle */}
          <div className="md:hidden w-full flex justify-center mb-2">
            <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('cart.selectedSkip')}
              </h3>
              <button
                onClick={toggleExpanded}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
                aria-label={t('cart.minimize')}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedSkip.size} {t('cart.yardSkip')}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedSkip.hirePeriod}
                  </p>
                </div>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {selectedSkip.price}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                {selectedSkip.allowedOnRoad && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                    bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300">
                    {t('skipCard.roadLegal')}
                  </span>
                )}
                {selectedSkip.allowsHeavyWaste && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                    bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300">
                    {t('skipCard.heavyWaste')}
                  </span>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={onBack}
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700
                    hover:bg-gray-200 dark:hover:bg-gray-600
                    rounded-xl text-gray-800 dark:text-gray-200
                    transition-colors duration-200"
                >
                  {t('cart.back')}
                </button>
                <button
                  onClick={onContinue}
                  className="flex-1 px-4 py-3 bg-blue-600 dark:bg-blue-500
                    hover:bg-blue-700 dark:hover:bg-blue-600
                    text-white rounded-xl
                    transition-colors duration-200"
                >
                  {t('cart.continue')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingCart;