import React from 'react';
import { 
  AdjustmentsHorizontalIcon, 
  MagnifyingGlassIcon,
  ChevronDownIcon,
  FunnelIcon,
  TruckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export interface FilterState {
  sortBy: 'price-asc' | 'price-desc' | 'size-asc' | 'size-desc' | 'none';
  heavyWasteOnly: boolean;
  roadLegalOnly: boolean;
  searchTerm: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  skipCount: number;
  totalCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  filters, 
  onFiltersChange, 
  skipCount, 
  totalCount 
}) => {
  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const handleFilterToggle = (filterKey: 'heavyWasteOnly' | 'roadLegalOnly') => {
    onFiltersChange({ 
      ...filters, 
      [filterKey]: !filters[filterKey] 
    });
  };

  const handleSearchChange = (searchTerm: string) => {
    onFiltersChange({ ...filters, searchTerm });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      sortBy: 'none',
      heavyWasteOnly: false,
      roadLegalOnly: false,
      searchTerm: ''
    });
  };

  const hasActiveFilters = filters.sortBy !== 'none' || 
                          filters.heavyWasteOnly || 
                          filters.roadLegalOnly || 
                          filters.searchTerm.length > 0;

  const getSortLabel = () => {
    switch (filters.sortBy) {
      case 'price-asc': return 'Price: Low → High';
      case 'price-desc': return 'Price: High → Low';
      case 'size-asc': return 'Size: Small → Large';
      case 'size-desc': return 'Size: Large → Small';
      default: return 'Sort by';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Filters & Sorting</h3>
          <span className="text-sm text-gray-500">
            ({skipCount} of {totalCount} skips)
          </span>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search skip sizes..."
            value={filters.searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as FilterState['sortBy'])}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white"
          >
            <option value="none">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="size-asc">Size: Small → Large</option>
            <option value="size-desc">Size: Large → Small</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Heavy Waste Filter */}
        <button
          onClick={() => handleFilterToggle('heavyWasteOnly')}
          className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-md border transition-colors ${
            filters.heavyWasteOnly
              ? 'bg-orange-50 border-orange-200 text-orange-700'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <ExclamationTriangleIcon className={`h-4 w-4 ${
            filters.heavyWasteOnly ? 'text-orange-600' : 'text-gray-500'
          }`} />
          <span className="text-sm font-medium">Heavy Waste</span>
          {filters.heavyWasteOnly && (
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          )}
        </button>

        {/* Road Legal Filter */}
        <button
          onClick={() => handleFilterToggle('roadLegalOnly')}
          className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-md border transition-colors ${
            filters.roadLegalOnly
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <TruckIcon className={`h-4 w-4 ${
            filters.roadLegalOnly ? 'text-green-600' : 'text-gray-500'
          }`} />
          <span className="text-sm font-medium">Road Legal</span>
          {filters.roadLegalOnly && (
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          )}
        </button>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.sortBy !== 'none' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <FunnelIcon className="h-3 w-3 mr-1" />
                {getSortLabel()}
              </span>
            )}
            {filters.heavyWasteOnly && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                Heavy Waste Compatible
              </span>
            )}
            {filters.roadLegalOnly && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <TruckIcon className="h-3 w-3 mr-1" />
                Road Legal
              </span>
            )}
            {filters.searchTerm && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <MagnifyingGlassIcon className="h-3 w-3 mr-1" />
                "{filters.searchTerm}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
