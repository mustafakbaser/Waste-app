import React from 'react';
import { 
  AdjustmentsHorizontalIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  TruckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
      case 'price-asc': return t('filters.priceLowToHigh');
      case 'price-desc': return t('filters.priceHighToLow');
      case 'size-asc': return t('filters.sizeSmallToLarge');
      case 'size-desc': return t('filters.sizeLargeToSmall');
      default: return t('filters.sortBy');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6 transition-all duration-300">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {t('filters.title')}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({skipCount} {t('filters.of')} {totalCount} {t('filters.skips')})
          </span>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
          >
            {t('filters.clearAll')}
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="text"
            placeholder={t('filters.searchPlaceholder')}
            value={filters.searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
              focus:border-blue-500 dark:focus:border-blue-400
              transition-all duration-200"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as FilterState['sortBy'])}
            className="block w-full pl-3 pr-10 py-2 text-base
              border border-gray-300 dark:border-gray-600 rounded-lg
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
              focus:border-blue-500 dark:focus:border-blue-400
              transition-all duration-200
              appearance-none"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em'
            }}
          >
            <option value="none">{t('filters.sortBy')}</option>
            <option value="price-asc">{t('filters.priceLowToHigh')}</option>
            <option value="price-desc">{t('filters.priceHighToLow')}</option>
            <option value="size-asc">{t('filters.sizeSmallToLarge')}</option>
            <option value="size-desc">{t('filters.sizeLargeToSmall')}</option>
          </select>
        </div>

        {/* Heavy Waste Filter */}
        <button
          onClick={() => handleFilterToggle('heavyWasteOnly')}
          className={`
            flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border
            transition-all duration-200
            ${filters.heavyWasteOnly
              ? 'bg-orange-50 dark:bg-orange-900/50 border-orange-200 dark:border-orange-700 text-orange-700 dark:text-orange-300'
              : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}
          `}
        >
          <ExclamationTriangleIcon className={`h-4 w-4 ${
            filters.heavyWasteOnly ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400'
          }`} />
          <span className="text-sm font-medium">{t('filters.heavyWaste')}</span>
          {filters.heavyWasteOnly && (
            <div className="w-2 h-2 bg-orange-500 dark:bg-orange-400 rounded-full" />
          )}
        </button>

        {/* Road Legal Filter */}
        <button
          onClick={() => handleFilterToggle('roadLegalOnly')}
          className={`
            flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border
            transition-all duration-200
            ${filters.roadLegalOnly
              ? 'bg-green-50 dark:bg-green-900/50 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300'
              : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}
          `}
        >
          <TruckIcon className={`h-4 w-4 ${
            filters.roadLegalOnly ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
          }`} />
          <span className="text-sm font-medium">{t('filters.roadLegal')}</span>
          {filters.roadLegalOnly && (
            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full" />
          )}
        </button>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {filters.sortBy !== 'none' && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                <FunnelIcon className="h-3 w-3 mr-1" />
                {getSortLabel()}
              </span>
            )}
            {filters.heavyWasteOnly && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300">
                <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                {t('filters.heavyWasteActive')}
              </span>
            )}
            {filters.roadLegalOnly && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300">
                <TruckIcon className="h-3 w-3 mr-1" />
                {t('filters.roadLegalActive')}
              </span>
            )}
            {filters.searchTerm && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
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