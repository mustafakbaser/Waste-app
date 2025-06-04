import React from 'react';
import type { Skip } from '../../types';

interface FooterProps {
  selectedSkip: Skip | null;
  onBack: () => void;
  onContinue: () => void;
}

const Footer: React.FC<FooterProps> = ({ 
  selectedSkip, 
  onBack, 
  onContinue 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex-1">
          {selectedSkip ? (
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Selected:</span>
              <span className="font-medium">
                <span className="font-semibold">{selectedSkip.size} Skip</span> | {selectedSkip.price} | {selectedSkip.hirePeriod} hire
              </span>
            </div>
          ) : (
            <p className="text-gray-500 italic">
              Please select a skip size before continuing.
            </p>
          )}
        </div>
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 transition-colors"
          >
            Back
          </button>
          
          <button
            type="button"
            onClick={onContinue}
            disabled={!selectedSkip}
            className={`
              px-5 py-2 rounded transition-colors flex items-center
              ${!selectedSkip 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-700 text-white hover:bg-blue-800'}
            `}
            aria-disabled={!selectedSkip}
          >
            Continue
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;