import React, { useState, useEffect } from 'react';
import { XIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import type { Skip } from '../../types';

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

  // Auto-expand when a skip is selected
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
    <div 
      className={`
        fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-full md:w-96' : 'w-16 h-16'}
        ${selectedSkip ? 'opacity-100' : 'opacity-50'}
      `}
    >
      {/* Collapsed State */}
      {!isExpanded && (
        <button
          onClick={toggleExpanded}
          disabled={!selectedSkip}
          className={`
            w-full h-full rounded-full shadow-lg flex items-center justify-center
            transition-all duration-300 ease-in-out
            ${selectedSkip 
              ? 'bg-blue-700 hover:bg-blue-800 cursor-pointer' 
              : 'bg-gray-400 cursor-not-allowed'}
          `}
          aria-label={selectedSkip ? "View selected skip details" : "No skip selected"}
        >
          <div className="text-white text-2xl">🛒</div>
        </button>
      )}

      {/* Expanded State */}
      {isExpanded && selectedSkip && (
        <div className="bg-white rounded-lg shadow-xl p-4 animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Selected Skip</h3>
            <button
              onClick={toggleExpanded}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Minimize cart"
            >
              <ChevronDownIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-bold">{selectedSkip.size} Yard Skip</p>
                <p className="text-gray-600">{selectedSkip.hirePeriod} hire</p>
              </div>
              <p className="text-xl font-bold text-blue-700">{selectedSkip.price}</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              {selectedSkip.allowedOnRoad && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Road Legal
                </span>
              )}
              {selectedSkip.allowsHeavyWaste && (
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                  Heavy Waste OK
                </span>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onBack}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={onContinue}
                className="flex-1 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingCart;