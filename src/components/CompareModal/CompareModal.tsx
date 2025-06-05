import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Skip } from '../../types';

interface CompareModalProps {
  skips: Skip[];
  isOpen: boolean;
  onClose: () => void;
}

const CompareModal: React.FC<CompareModalProps> = ({ skips, isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const compareFields = [
    { label: t('compare.size'), getValue: (skip: Skip) => `${skip.size} ${t('cart.yardSkip')}` },
    { label: t('compare.hirePeriod'), getValue: (skip: Skip) => skip.hirePeriod },
    { label: t('compare.price'), getValue: (skip: Skip) => skip.price },
    { label: t('compare.roadLegal'), getValue: (skip: Skip) => skip.allowedOnRoad ? t('compare.yes') : t('compare.no') },
    { label: t('compare.heavyWaste'), getValue: (skip: Skip) => skip.allowsHeavyWaste ? t('compare.yes') : t('compare.no') },
    { label: t('compare.transportCost'), getValue: (skip: Skip) => skip.transportCost ? `£${skip.transportCost}` : t('compare.na') },
    { label: t('compare.perTonneCost'), getValue: (skip: Skip) => skip.perTonneCost ? `£${skip.perTonneCost}` : t('compare.na') },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-labelledby="compare-modal-title"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-5xl transform overflow-hidden rounded-2xl 
          bg-white dark:bg-gray-800 
          text-left shadow-2xl transition-all
          animate-fade-in">
          
          {/* Header */}
          <div className="px-6 pt-6 pb-4">
            <div className="flex justify-between items-center">
              <h3 
                className="text-lg font-medium text-gray-900 dark:text-white" 
                id="compare-modal-title"
              >
                {t('compare.title')}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 
                  transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label={t('compare.close')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('compare.feature')}
                    </th>
                    {skips.map((skip, index) => (
                      <th 
                        key={skip.id} 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        {t('compare.skipNumber', { number: index + 1 })}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {compareFields.map((field, rowIndex) => (
                    <tr 
                      key={field.label}
                      className={rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {field.label}
                      </td>
                      {skips.map((skip) => (
                        <td 
                          key={`${skip.id}-${field.label}`} 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                        >
                          {field.getValue(skip)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 dark:bg-blue-500 
                text-white rounded-lg font-medium
                hover:bg-blue-700 dark:hover:bg-blue-600
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                dark:focus:ring-offset-gray-800
                transition-colors"
            >
              {t('compare.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;