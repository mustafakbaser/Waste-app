import React from 'react';
import { X } from 'lucide-react';
import type { Skip } from '../../types';

interface CompareModalProps {
  skips: Skip[];
  isOpen: boolean;
  onClose: () => void;
}

const CompareModal: React.FC<CompareModalProps> = ({ skips, isOpen, onClose }) => {
  if (!isOpen) return null;

  const compareFields = [
    { label: 'Size', getValue: (skip: Skip) => `${skip.size} Yards` },
    { label: 'Hire Period', getValue: (skip: Skip) => skip.hirePeriod },
    { label: 'Price', getValue: (skip: Skip) => skip.price },
    { label: 'Road Legal', getValue: (skip: Skip) => skip.allowedOnRoad ? 'Yes' : 'No' },
    { label: 'Heavy Waste', getValue: (skip: Skip) => skip.allowsHeavyWaste ? 'Yes' : 'No' },
    { label: 'Transport Cost', getValue: (skip: Skip) => skip.transportCost ? `£${skip.transportCost}` : 'N/A' },
    { label: 'Per Tonne Cost', getValue: (skip: Skip) => skip.perTonneCost ? `£${skip.perTonneCost}` : 'N/A' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose} />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                Skip Comparison
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
                aria-label="Close comparison"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    {skips.map((skip, index) => (
                      <th key={skip.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Skip {index + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {compareFields.map((field, rowIndex) => (
                    <tr key={field.label} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {field.label}
                      </td>
                      {skips.map((skip) => (
                        <td key={`${skip.id}-${field.label}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {field.getValue(skip)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;