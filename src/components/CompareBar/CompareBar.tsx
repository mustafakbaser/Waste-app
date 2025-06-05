import React from 'react';
import { Scale, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Skip } from '../../types';

interface CompareBarProps {
  skips: Skip[];
  onRemoveSkip: (skip: Skip) => void;
  onCompare: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const CompareBar: React.FC<CompareBarProps> = ({
  skips,
  onRemoveSkip,
  onCompare,
  isExpanded,
  onToggleExpand,
}) => {
  const { t } = useTranslation();

  if (skips.length === 0) return null;

  return (
    <div className={`
      fixed bottom-0 left-0 right-0 z-40
      bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
      border-t border-gray-200 dark:border-gray-700
      shadow-lg transform transition-transform duration-300 ease-in-out
      ${isExpanded ? 'translate-y-0' : 'translate-y-[80%]'}
    `}>
      {/* Header Bar */}
      <div 
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={onToggleExpand}
      >
        <div className="flex items-center space-x-3">
          <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            {skips.length} {skips.length === 1 ? t('cart.yardSkip') : t('filters.skips')}
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        )}
      </div>

      {/* Expanded Content */}
      <div className={`
        px-4 pb-4 space-y-4
        ${isExpanded ? 'block' : 'hidden'}
      `}>
        {/* Skip List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skips.map((skip) => (
            <div
              key={skip.id}
              className="flex items-center justify-between p-3 
                bg-gray-50 dark:bg-gray-700/50 
                rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {skip.size} {t('cart.yardSkip')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {skip.price}
                </p>
              </div>
              <button
                onClick={() => onRemoveSkip(skip)}
                className="p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 
                  dark:hover:text-gray-400 rounded-full 
                  hover:bg-gray-100 dark:hover:bg-gray-600
                  transition-colors"
                aria-label={t('filters.clearAll')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Compare Button */}
        <div className="flex justify-center">
          <button
            onClick={onCompare}
            className="inline-flex items-center px-6 py-3 
              bg-blue-600 dark:bg-blue-500 
              hover:bg-blue-700 dark:hover:bg-blue-600
              text-white rounded-full font-medium
              shadow-lg hover:shadow-xl
              transform hover:scale-105
              transition-all duration-200"
          >
            <Scale className="h-5 w-5 mr-2" />
            {t('compare.title')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;