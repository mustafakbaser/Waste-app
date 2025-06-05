import React from 'react';
import { PackageSearch } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-lg shadow-sm border border-gray-200">
      <PackageSearch className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No skips match your filters
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn't find any skips matching your current filters. Try adjusting your search criteria or reset the filters to see all available options.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default EmptyState;